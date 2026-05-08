from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
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
)
from typing import Optional

C = HttpConstants.HttpResponseCodes


class RFIDCardService:
    def __init__(self, db: Session):
        self.card_repo = RFIDCardRepository(db)
        self.txn_repo = RFIDTransactionRepository(db)
        self.db = db

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _get_card(self, card_id: int):
        return self.card_repo.get_by_id(card_id)

    def _get_active_customer(self, customer_id: int):
        return self.db.query(Customer).filter(
            Customer.id == customer_id,
            Customer.is_active == True,
        ).first()

    # ── Card inventory management ─────────────────────────────────────────────

    def register_card(self, data: RegisterCardRequest, staff: Staff) -> CustomResponse:
        if self.card_repo.get_by_uid(data.card_uid):
            return CustomResponse(C.CONFLICT, f"A card with UID '{data.card_uid}' is already registered")
        card = RFIDCard(card_uid=data.card_uid)
        card = self.card_repo.create(card)
        return CustomResponse(C.CREATED, "RFID card registered successfully", data=card)

    def get_card(self, card_id: int) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")
        return CustomResponse(C.OK, "RFID card fetched successfully", data=card)

    def get_card_by_uid(self, card_uid: str) -> CustomResponse:
        card = self.card_repo.get_by_uid(card_uid)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")
        return CustomResponse(C.OK, "RFID card fetched successfully", data=card)

    def list_cards(self, skip: int, limit: int, status_filter: Optional[RFIDCardStatusEnum] = None) -> CustomResponse:
        total, items = self.card_repo.get_all(skip=skip, limit=limit, status=status_filter)
        data = []
        for card in items:
            data.append({
                "id": card.id,
                "card_uid": card.card_uid,
                "status": card.status,
                "balance": card.balance,
                "customer_id": card.customer_id,
                "customer_name": card.customer.name if card.customer else None,
                "bound_at": card.bound_at,
                "bound_by": card.bound_by,
                "created_at": card.created_at,
                "updated_at": card.updated_at,
            })
        return CustomResponse(C.OK, "RFID cards fetched successfully", data=data, meta={"total": total, "skip": skip, "limit": limit})

    def get_all_cards(self) -> CustomResponse:
        items = self.card_repo.get_all_cards()
        return CustomResponse(C.OK, "RFID cards fetched successfully", data=items, meta={"total": len(items)})

    # ── Card lifecycle ────────────────────────────────────────────────────────

    def bind_card(self, card_id: int, data: BindCardRequest, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status != RFIDCardStatusEnum.available:
            return CustomResponse(C.BAD_REQUEST, f"Card is not available for binding (current status: {card.status.value})")

        customer = self._get_active_customer(data.customer_id)
        if not customer:
            return CustomResponse(C.BAD_REQUEST, "Customer not found or is inactive")

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
        return CustomResponse(C.OK, "Card bound to customer successfully", data=card)

    def load_card(self, card_id: int, data: LoadCardRequest, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status != RFIDCardStatusEnum.active:
            return CustomResponse(C.BAD_REQUEST, f"Only active cards can be loaded (current status: {card.status.value})")

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
        return CustomResponse(C.OK, "Card balance loaded successfully", data=card)

    def clear_card(self, card_id: int, data: ClearCardRequest, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status != RFIDCardStatusEnum.active:
            return CustomResponse(C.BAD_REQUEST, f"Only active cards can be cleared (current status: {card.status.value})")

        remaining = float(card.balance)

        if remaining > 0:
            # A refund method is required so the audit trail records how the money was returned
            if not data.refund_method:
                return CustomResponse(C.BAD_REQUEST, f"Card has a remaining balance of {remaining}. Provide refund_method to record how it was returned to the customer.")
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
        return CustomResponse(C.OK, "Card cleared successfully", data=card)

    # ── Block / unblock ───────────────────────────────────────────────────────

    def block_card(self, card_id: int, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status in (RFIDCardStatusEnum.blocked, RFIDCardStatusEnum.lost):
            return CustomResponse(C.BAD_REQUEST, f"Card is already {card.status.value}")

        card.status = RFIDCardStatusEnum.blocked
        card = self.card_repo.save(card)
        return CustomResponse(C.OK, "Card blocked successfully", data=card)

    def mark_lost(self, card_id: int, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status == RFIDCardStatusEnum.lost:
            return CustomResponse(C.BAD_REQUEST, "Card is already marked as lost")

        card.status = RFIDCardStatusEnum.lost
        card = self.card_repo.save(card)
        return CustomResponse(C.OK, "Card marked as lost successfully", data=card)

    def unblock_card(self, card_id: int, staff: Staff) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")

        if card.status not in (RFIDCardStatusEnum.blocked, RFIDCardStatusEnum.lost):
            return CustomResponse(C.BAD_REQUEST, f"Card is not blocked or lost (current status: {card.status.value})")

        card.status = RFIDCardStatusEnum.active if card.customer_id else RFIDCardStatusEnum.available
        card = self.card_repo.save(card)
        return CustomResponse(C.OK, "Card unblocked successfully", data=card)

    # ── Transaction history ───────────────────────────────────────────────────

    def get_transactions(self, card_id: int, skip: int, limit: int) -> CustomResponse:
        card = self._get_card(card_id)
        if not card:
            return CustomResponse(C.NOT_FOUND, "RFID card not found")
        total, items = self.txn_repo.get_by_card(card_id, skip=skip, limit=limit)
        return CustomResponse(C.OK, "Transactions fetched successfully", data=items, meta={"total": total, "skip": skip, "limit": limit})
