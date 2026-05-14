from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.repositories.payment_repo import PaymentRepository
from app.repositories.bill_repo import BillRepository
from app.models.payment import Payment, PaymentMethodEnum
from app.models.bill import Bill, BillStatusEnum
from app.models.customer import Customer
from app.models.order import Order, OrderStatusEnum
from app.models.restaurant_table import RestaurantTable, TableStatusEnum
from app.models.table_merge import TableMerge
from app.models.user import Staff
from app.models.rfid_card import RFIDCard, RFIDCardStatusEnum
from app.models.rfid_card_transaction import RFIDCardTransaction, RFIDTransactionTypeEnum

C = HttpConstants.HttpResponseCodes


class PaymentService:
    def __init__(self, db: Session):
        self.payment_repo = PaymentRepository(db)
        self.bill_repo = BillRepository(db)
        self.db = db

    def _get_bill(self, bill_id: int):
        return self.bill_repo.get_by_id(bill_id)

    def _settle(self, bill: Bill, settled_by: Staff) -> None:
        """
        Runs the full settlement cascade in one go — no intermediate commits.
        Called just before the final db.commit() in add_payment.

        Order of operations:
        1. Mark bill as settled
        2. Mark order as completed
        3. Close active table merge if any (SRS 3.3 — unmerge after billing)
        4. Free the order table; only free the merged partner table if it has no active order
        """
        bill.status = BillStatusEnum.settled
        bill.settled_at = datetime.now(timezone.utc)
        bill.settled_by = settled_by.id

        order: Order = bill.order
        order.status = OrderStatusEnum.completed

        active_merge = self.db.query(TableMerge).filter(
            TableMerge.is_active == True,
            (TableMerge.primary_table_id == order.table_id) |
            (TableMerge.merged_table_id == order.table_id)
        ).first()

        if active_merge:
            active_merge.is_active = False
            active_merge.unmerged_at = datetime.now(timezone.utc)
            other_table_id = (
                active_merge.merged_table_id
                if active_merge.primary_table_id == order.table_id
                else active_merge.primary_table_id
            )
            # Only free the merged partner table if it has no active order of its own.
            # If the partner has an open order, leave its status unchanged so it is
            # not shown as available while a separate bill is still running on it.
            other_has_active_order = self.db.query(Order).filter(
                Order.table_id == other_table_id,
                Order.status.notin_([OrderStatusEnum.completed, OrderStatusEnum.cancelled]),
                Order.is_deleted == False,
            ).first()
            if not other_has_active_order:
                other_table = self.db.query(RestaurantTable).filter(
                    RestaurantTable.id == other_table_id
                ).first()
                if other_table:
                    other_table.status = TableStatusEnum.available

        table = self.db.query(RestaurantTable).filter(
            RestaurantTable.id == order.table_id
        ).first()
        if table:
            table.status = TableStatusEnum.available

    def add_partial_payment(self, bill_id: int, data, current_staff: Staff) -> CustomResponse:
        """
        Process multiple payment methods atomically in a single request.
        All validations run first — if any fail, nothing is saved.
        On success everything lands in one DB commit.
        """
        bill = self._get_bill(bill_id)
        if not bill:
            return CustomResponse(C.NOT_FOUND, "Bill not found")

        # ── Bill status checks ────────────────────────────────────────────────
        if bill.status == BillStatusEnum.settled:
            return CustomResponse(C.BAD_REQUEST, "Bill is already settled")
        if bill.status == BillStatusEnum.cancelled:
            return CustomResponse(C.BAD_REQUEST, "Cannot add payment to a cancelled bill")
        if bill.status != BillStatusEnum.draft:
            return CustomResponse(C.BAD_REQUEST, "Payments can only be added to a draft bill")

        # ── Order checks ──────────────────────────────────────────────────────
        order: Order = bill.order
        if not order:
            return CustomResponse(C.BAD_REQUEST, "No order linked to this bill")
        if order.is_deleted:
            return CustomResponse(C.BAD_REQUEST, "Order has been deleted")
        if order.status == OrderStatusEnum.cancelled:
            return CustomResponse(C.BAD_REQUEST, "Cannot process payment for a cancelled order")
        if order.status == OrderStatusEnum.completed:
            return CustomResponse(C.BAD_REQUEST, "Order is already completed")

        # ── Bill amount checks ────────────────────────────────────────────────
        if float(bill.grand_total) <= 0:
            return CustomResponse(C.BAD_REQUEST, "Bill total must be greater than zero")

        already_paid = self.payment_repo.get_total_paid(bill_id)
        grand_total  = round(float(bill.grand_total), 2)
        remaining    = round(grand_total - already_paid, 2)

        if remaining <= 0:
            return CustomResponse(C.BAD_REQUEST, "Bill is already fully paid")

        # ── Step 1: Validate ALL payments before touching the DB ──────────────
        total_requested = round(sum(p.amount for p in data.payments), 2)

        if total_requested <= 0:
            return CustomResponse(C.BAD_REQUEST, "Total payment amount must be greater than zero")

        if total_requested > remaining:
            return CustomResponse(
                C.BAD_REQUEST,
                f"Total payment amount ({total_requested}) exceeds remaining balance ({remaining})"
            )

        rfid_map: dict = {}  # card_uid → RFIDCard — pre-fetched for RFID payments

        for item in data.payments:

            # ── Complimentary — manager/admin only ────────────────────────────
            if item.payment_method == PaymentMethodEnum.complimentary:
                if current_staff.role.name not in ("admin", "manager"):
                    return CustomResponse(C.FORBIDDEN, "Only managers and admins can record complimentary payments")

            # ── Due — customer must be linked + active ────────────────────────
            if item.payment_method == PaymentMethodEnum.due:
                if not order.customer_id:
                    return CustomResponse(C.BAD_REQUEST, "Due payments require a customer to be linked to the order")
                customer = self.db.query(Customer).filter(
                    Customer.id == order.customer_id,
                    Customer.is_active == True,
                ).first()
                if not customer:
                    return CustomResponse(C.BAD_REQUEST, "The customer linked to this order is inactive")

            # ── RFID — full validation ────────────────────────────────────────
            if item.payment_method == PaymentMethodEnum.rfid:

                # 1. card_uid must be provided
                if not item.card_uid:
                    return CustomResponse(C.BAD_REQUEST, "card_uid is required for RFID payments")

                # 2. Card must exist
                rfid_card = self.db.query(RFIDCard).filter(RFIDCard.card_uid == item.card_uid).first()
                if not rfid_card:
                    return CustomResponse(C.NOT_FOUND, f"RFID card '{item.card_uid}' not found")

                # 3. Card must be active (not blocked/lost/available)
                if rfid_card.status != RFIDCardStatusEnum.active:
                    return CustomResponse(C.BAD_REQUEST, f"RFID card is not active (status: {rfid_card.status.value})")

                # 4. Card must be assigned to a customer
                if not rfid_card.customer_id:
                    return CustomResponse(C.BAD_REQUEST, "This RFID card is not assigned to any customer")

                # 5. Card must belong to the customer linked to this order
                if not order.customer_id:
                    return CustomResponse(C.BAD_REQUEST, "RFID payment requires a customer to be linked to the order")
                if rfid_card.customer_id != order.customer_id:
                    return CustomResponse(C.BAD_REQUEST, "This RFID card does not belong to the customer linked to this order")

                # 6. Card must have sufficient balance
                if float(rfid_card.balance) < item.amount:
                    return CustomResponse(
                        C.BAD_REQUEST,
                        f"Insufficient RFID balance. Available: {float(rfid_card.balance)}, Required: {item.amount}"
                    )

                # 7. Amount must not exceed remaining balance
                if item.amount > remaining:
                    return CustomResponse(
                        C.BAD_REQUEST,
                        f"RFID payment amount ({item.amount}) exceeds remaining bill balance ({remaining})"
                    )

                rfid_map[item.card_uid] = rfid_card

        # ── Step 2: All validations passed — now write to DB ──────────────────
        created_payments = []

        for item in data.payments:
            payment = Payment(
                bill_id          = bill_id,
                payment_method   = item.payment_method,
                amount           = item.amount,
                reference_number = item.reference_number,
                collected_by     = current_staff.id,
            )
            self.db.add(payment)
            created_payments.append(payment)

            # Deduct RFID balance + record debit transaction
            if item.payment_method == PaymentMethodEnum.rfid:
                rfid_card = rfid_map[item.card_uid]
                rfid_card.balance = round(float(rfid_card.balance) - item.amount, 2)
                self.db.add(RFIDCardTransaction(
                    card_id          = rfid_card.id,
                    transaction_type = RFIDTransactionTypeEnum.debit,
                    amount           = item.amount,
                    bill_id          = bill_id,
                    performed_by     = current_staff.id,
                    note             = "Bill payment deduction (partial)",
                ))

        # ── Step 3: Check if bill is now fully settled ─────────────────────────
        new_total_paid = round(already_paid + total_requested, 2)
        is_settled     = new_total_paid >= grand_total

        if is_settled:
            self._settle(bill, current_staff)

        self.db.commit()
        for p in created_payments:
            self.db.refresh(p)

        return CustomResponse(C.CREATED, "Partial payment recorded successfully", data={
            "bill_id":     bill_id,
            "grand_total": grand_total,
            "total_paid":  new_total_paid,
            "remaining":   round(grand_total - new_total_paid, 2),
            "is_settled":  is_settled,
            "payments":    created_payments,
        })

    def add_payment(self, bill_id: int, data, current_staff: Staff) -> CustomResponse:
        bill = self._get_bill(bill_id)
        if not bill:
            return CustomResponse(C.NOT_FOUND, "Bill not found")

        if bill.status != BillStatusEnum.draft:
            return CustomResponse(C.BAD_REQUEST, "Payments can only be added to a draft bill")

        # Complimentary payments are restricted to managers and admins.
        # If cashier access is needed in future, add the approved_by pattern
        # here (same structure used in discount management).
        if data.payment_method == PaymentMethodEnum.complimentary:
            if current_staff.role.name not in ("admin", "manager"):
                return CustomResponse(C.FORBIDDEN, "Only managers and admins can record complimentary payments")

        # Due payments need an active customer to track who owes the money
        if data.payment_method == PaymentMethodEnum.due:
            if not bill.order.customer_id:
                return CustomResponse(C.BAD_REQUEST, "Due payments require a customer to be linked to the order")
            customer = self.db.query(Customer).filter(
                Customer.id == bill.order.customer_id,
                Customer.is_active == True,
            ).first()
            if not customer:
                return CustomResponse(C.BAD_REQUEST, "The customer linked to this order is inactive. Dues cannot be recorded against an inactive customer.")

        # RFID payments: verify the card is active and has enough balance.
        # We check here (not at bill generation time) so a card reload between
        # bill creation and payment is always reflected correctly.
        rfid_card = None
        if data.payment_method == PaymentMethodEnum.rfid:
            rfid_card = self.db.query(RFIDCard).filter(RFIDCard.card_uid == data.card_uid).first()
            if not rfid_card:
                return CustomResponse(C.NOT_FOUND, f"RFID card '{data.card_uid}' not found")
            if rfid_card.status != RFIDCardStatusEnum.active:
                return CustomResponse(C.BAD_REQUEST, f"RFID card is not active (current status: {rfid_card.status.value})")
            if float(rfid_card.balance) < data.amount:
                return CustomResponse(C.BAD_REQUEST, f"Insufficient card balance. Available: {float(rfid_card.balance)}, Required: {data.amount}")

        already_paid = self.payment_repo.get_total_paid(bill_id)
        remaining = round(float(bill.grand_total) - already_paid, 2)

        if data.amount > remaining:
            return CustomResponse(C.BAD_REQUEST, f"Payment amount exceeds remaining balance of {remaining}")

        payment = Payment(
            bill_id=bill_id,
            payment_method=data.payment_method,
            amount=data.amount,
            reference_number=data.reference_number,
            collected_by=current_staff.id,
        )
        self.db.add(payment)

        # Deduct from RFID card balance and record a debit transaction.
        # Both the payment row and the card deduction land in the same commit below.
        if rfid_card is not None:
            rfid_card.balance = round(float(rfid_card.balance) - data.amount, 2)
            debit_txn = RFIDCardTransaction(
                card_id=rfid_card.id,
                transaction_type=RFIDTransactionTypeEnum.debit,
                amount=data.amount,
                bill_id=bill_id,
                performed_by=current_staff.id,
                note="Bill payment deduction",
            )
            self.db.add(debit_txn)

        # If this payment clears the balance, run the full settlement cascade
        # before committing so everything lands in one transaction.
        new_total_paid = round(already_paid + data.amount, 2)
        if new_total_paid >= float(bill.grand_total):
            self._settle(bill, current_staff)

        self.db.commit()
        self.db.refresh(payment)
        return CustomResponse(C.CREATED, "Payment recorded successfully", data=payment)

    def get_by_bill(self, bill_id: int) -> CustomResponse:
        bill = self._get_bill(bill_id)
        if not bill:
            return CustomResponse(C.NOT_FOUND, "Bill not found")
        payments = self.payment_repo.get_by_bill_id(bill_id)
        return CustomResponse(C.OK, "Payments fetched successfully", data=payments)

    def remove_payment(self, bill_id: int, payment_id: int, current_staff: Staff) -> CustomResponse:
        bill = self._get_bill(bill_id)
        if not bill:
            return CustomResponse(C.NOT_FOUND, "Bill not found")

        if bill.status != BillStatusEnum.draft:
            return CustomResponse(C.BAD_REQUEST, "Payments can only be removed from a draft bill")

        payment = self.payment_repo.get_by_id(payment_id)
        if not payment or payment.bill_id != bill_id:
            return CustomResponse(C.NOT_FOUND, "Payment not found on this bill")

        # If the removed payment was an RFID debit, restore the card balance
        # and void the corresponding debit transaction by adding a reversal load.
        if payment.payment_method == PaymentMethodEnum.rfid:
            rfid_card = self.db.query(RFIDCard).join(
                RFIDCardTransaction,
                RFIDCardTransaction.card_id == RFIDCard.id,
            ).filter(
                RFIDCardTransaction.bill_id == bill_id,
                RFIDCardTransaction.transaction_type == RFIDTransactionTypeEnum.debit,
            ).first()
            if rfid_card:
                rfid_card.balance = round(float(rfid_card.balance) + float(payment.amount), 2)
                reversal = RFIDCardTransaction(
                    card_id=rfid_card.id,
                    transaction_type=RFIDTransactionTypeEnum.load,
                    amount=payment.amount,
                    performed_by=current_staff.id,
                    note="Reversal — payment removed from draft bill",
                )
                self.db.add(reversal)

        self.payment_repo.delete(payment)
        return CustomResponse(C.OK, "Payment removed successfully")