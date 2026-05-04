from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.payment_repo import PaymentRepository
from app.repositories.bill_repo import BillRepository
from app.models.payment import Payment, PaymentMethodEnum
from app.models.bill import Bill, BillStatusEnum
from app.models.customer import Customer
from app.models.order import Order, OrderStatusEnum
from app.models.restaurant_table import RestaurantTable, TableStatusEnum
from app.models.table_merge import TableMerge
from app.models.user import Staff


class PaymentService:
    def __init__(self, db: Session):
        self.payment_repo = PaymentRepository(db)
        self.bill_repo = BillRepository(db)
        self.db = db

    def _get_bill_or_404(self, bill_id: int) -> Bill:
        bill = self.bill_repo.get_by_id(bill_id)
        if not bill:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bill not found")
        return bill

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

    def add_payment(self, bill_id: int, data, current_staff: Staff) -> Payment:
        bill = self._get_bill_or_404(bill_id)

        if bill.status != BillStatusEnum.draft:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payments can only be added to a draft bill"
            )

        # Complimentary payments are restricted to managers and admins.
        # If cashier access is needed in future, add the approved_by pattern
        # here (same structure used in discount management).
        if data.payment_method == PaymentMethodEnum.complimentary:
            if current_staff.role.name not in ("admin", "manager"):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Only managers and admins can record complimentary payments"
                )

        # Due payments need an active customer to track who owes the money
        if data.payment_method == PaymentMethodEnum.due:
            if not bill.order.customer_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Due payments require a customer to be linked to the order"
                )
            customer = self.db.query(Customer).filter(
                Customer.id == bill.order.customer_id,
                Customer.is_active == True,
            ).first()
            if not customer:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="The customer linked to this order is inactive. Dues cannot be recorded against an inactive customer."
                )

        already_paid = self.payment_repo.get_total_paid(bill_id)
        remaining = round(float(bill.grand_total) - already_paid, 2)

        if data.amount > remaining:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment amount exceeds remaining balance of {remaining}"
            )

        payment = Payment(
            bill_id=bill_id,
            payment_method=data.payment_method,
            amount=data.amount,
            reference_number=data.reference_number,
            collected_by=current_staff.id,
        )
        self.db.add(payment)

        # If this payment clears the balance, run the full settlement cascade
        # before committing so everything lands in one transaction.
        new_total_paid = round(already_paid + data.amount, 2)
        if new_total_paid >= float(bill.grand_total):
            self._settle(bill, current_staff)

        self.db.commit()
        self.db.refresh(payment)
        return payment

    def get_by_bill(self, bill_id: int) -> list[Payment]:
        self._get_bill_or_404(bill_id)
        return self.payment_repo.get_by_bill_id(bill_id)

    def remove_payment(self, bill_id: int, payment_id: int) -> dict:
        bill = self._get_bill_or_404(bill_id)

        if bill.status != BillStatusEnum.draft:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payments can only be removed from a draft bill"
            )

        payment = self.payment_repo.get_by_id(payment_id)
        if not payment or payment.bill_id != bill_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found on this bill"
            )

        self.payment_repo.delete(payment)
        return {"message": "Payment removed successfully"}
