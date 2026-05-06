from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.rfid_card_repo import RFIDCardRepository
from app.repositories.rfid_transaction_repo import RFIDTransactionRepository
from app.models.rfid_card import RFIDCard, RFIDCardStatusEnum
from app.models.rfid_card_transaction import RFIDCardTransaction, RFIDTransactionTypeEnum
from app.models.customer import Customer
from app.models.user import Staff
from app.schemas.rfid_card import (
    RegisterCardRequest,
    BindCardRequest,
    LoadCardRequest,
    ClearCardRequest,
    RFIDCardListOut,
    RFIDCardTransactionListOut,
)
from typing import Optional


class RFIDCardService:
    def __init__(self, db: Session):
        self.card_repo = RFIDCardRepository(db)
        self.txn_repo = RFIDTransactionRepository(db)
        self.db = db

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _get_card_or_404(self, card_id: int) -> RFIDCard:
        card = self.card_repo.get_by_id(card_id)
        if not card:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="RFID card not found")
        return card

    def _get_card_by_uid_or_404(self, card_uid: str) -> RFIDCard:
        card = self.card_repo.get_by_uid(card_uid)
        if not card:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="RFID card not found")
        return card

    def _get_active_customer_or_400(self, customer_id: int) -> Customer:
        customer = self.db.query(Customer).filter(
            Customer.id == customer_id,
            Customer.is_active == True,
        ).first()
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Customer not found or is inactive",
            )
        return customer

    # ── Card inventory management ─────────────────────────────────────────────

    def register_card(self, data: RegisterCardRequest, staff: Staff) -> RFIDCard:
        """
        Register a new physical RFID card into the system.
        The card starts with zero balance and available status.
        Only admins can register cards (enforced in the route layer).
        """
        existing = self.card_repo.get_by_uid(data.card_uid)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"A card with UID '{data.card_uid}' is already registered",
            )
        card = RFIDCard(card_uid=data.card_uid)
        return self.card_repo.create(card)

    def get_card(self, card_id: int) -> RFIDCard:
        return self._get_card_or_404(card_id)

    def get_card_by_uid(self, card_uid: str) -> RFIDCard:
        """Used by billing staff when a customer scans their card at the counter."""
        return self._get_card_by_uid_or_404(card_uid)

    def list_cards(self, skip: int, limit: int, status_filter: Optional[RFIDCardStatusEnum] = None) -> RFIDCardListOut:
        total, items = self.card_repo.get_all(skip=skip, limit=limit, status=status_filter)
        return RFIDCardListOut(total=total, skip=skip, limit=limit, items=items)

    # ── Card lifecycle ────────────────────────────────────────────────────────

    def bind_card(self, card_id: int, data: BindCardRequest, staff: Staff) -> RFIDCard:
        """
        Bind a card to a customer and optionally load an initial balance.
        The customer must already be registered and active.
        A card can only be bound when it is in the available state.
        """
        card = self._get_card_or_404(card_id)

        if card.status != RFIDCardStatusEnum.available:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Card is not available for binding (current status: {card.status.value})",
            )

        customer = self._get_active_customer_or_400(data.customer_id)

        # Bind the card
        card.status = RFIDCardStatusEnum.active
        card.customer_id = customer.id
        card.bound_at = datetime.now(timezone.utc)
        card.bound_by = staff.id
        card.balance = round(float(card.balance) + data.initial_load_amount, 2)

        # Record the initial load as a transaction even when amount is zero —
        # creates a clear audit entry showing when and by whom the card was bound.
        txn = RFIDCardTransaction(
            card_id=card.id,
            transaction_type=RFIDTransactionTypeEnum.load,
            amount=data.initial_load_amount,
            payment_method=data.payment_method,
            reference_number=data.reference_number,
            performed_by=staff.id,
            note=f"Initial load on bind to customer {customer.customer_id}",
        )
        self.txn_repo.create(txn)

        self.db.commit()
        self.db.refresh(card)
        return card

    def load_card(self, card_id: int, data: LoadCardRequest, staff: Staff) -> RFIDCard:
        """
        Top up an active card. The customer pays at the counter and the virtual balance increases.
        A blocked or lost card cannot be loaded.
        """
        card = self._get_card_or_404(card_id)

        if card.status != RFIDCardStatusEnum.active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only active cards can be loaded (current status: {card.status.value})",
            )

        card.balance = round(float(card.balance) + data.amount, 2)

        txn = RFIDCardTransaction(
            card_id=card.id,
            transaction_type=RFIDTransactionTypeEnum.load,
            amount=data.amount,
            payment_method=data.payment_method,
            reference_number=data.reference_number,
            performed_by=staff.id,
        )
        self.txn_repo.create(txn)

        self.db.commit()
        self.db.refresh(card)
        return card

    def clear_card(self, card_id: int, data: ClearCardRequest, staff: Staff) -> RFIDCard:
        """
        Clear a card after a customer's session ends.
        - If a balance remains, a refund transaction is recorded (staff physically hands cash/transfer back).
        - The card is unbound from the customer and returned to the available pool.
        """
        card = self._get_card_or_404(card_id)

        if card.status != RFIDCardStatusEnum.active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only active cards can be cleared (current status: {card.status.value})",
            )

        remaining = float(card.balance)

        if remaining > 0:
            # A refund method is required so the audit trail records how the money was returned
            if not data.refund_method:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Card has a remaining balance of {remaining}. Provide refund_method to record how it was returned to the customer.",
                )
            txn = RFIDCardTransaction(
                card_id=card.id,
                transaction_type=RFIDTransactionTypeEnum.refund,
                amount=remaining,
                payment_method=data.refund_method,
                reference_number=data.reference_number,
                performed_by=staff.id,
                note=data.note or f"Refund on card clear — {remaining} returned to customer",
            )
            self.txn_repo.create(txn)

        # Reset card to the available pool
        card.balance = 0
        card.status = RFIDCardStatusEnum.available
        card.customer_id = None
        card.bound_at = None
        card.bound_by = None

        self.db.commit()
        self.db.refresh(card)
        return card

    # ── Block / unblock ───────────────────────────────────────────────────────

    def block_card(self, card_id: int, staff: Staff) -> RFIDCard:
        """
        Block a card (lost, damaged, or suspicious use).
        Blocked cards cannot accept loads or be used for payment.
        Only admins can block cards (enforced in the route layer).
        """
        card = self._get_card_or_404(card_id)

        if card.status in (RFIDCardStatusEnum.blocked, RFIDCardStatusEnum.lost):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Card is already {card.status.value}",
            )

        card.status = RFIDCardStatusEnum.blocked
        return self.card_repo.save(card)

    def mark_lost(self, card_id: int, staff: Staff) -> RFIDCard:
        """
        Mark a card as lost. Treated the same as blocked operationally,
        but kept as a separate status so lost cards appear distinctly in reports.
        """
        card = self._get_card_or_404(card_id)

        if card.status == RFIDCardStatusEnum.lost:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Card is already marked as lost",
            )

        card.status = RFIDCardStatusEnum.lost
        return self.card_repo.save(card)

    def unblock_card(self, card_id: int, staff: Staff) -> RFIDCard:
        """
        Unblock a card that was previously blocked or marked lost.
        If the card still has a customer linked, it goes back to active.
        If no customer is linked, it returns to available.
        """
        card = self._get_card_or_404(card_id)

        if card.status not in (RFIDCardStatusEnum.blocked, RFIDCardStatusEnum.lost):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Card is not blocked or lost (current status: {card.status.value})",
            )

        card.status = RFIDCardStatusEnum.active if card.customer_id else RFIDCardStatusEnum.available
        return self.card_repo.save(card)

    # ── Transaction history ───────────────────────────────────────────────────

    def get_transactions(self, card_id: int, skip: int, limit: int) -> RFIDCardTransactionListOut:
        self._get_card_or_404(card_id)
        total, items = self.txn_repo.get_by_card(card_id, skip=skip, limit=limit)
        return RFIDCardTransactionListOut(total=total, skip=skip, limit=limit, items=items)
