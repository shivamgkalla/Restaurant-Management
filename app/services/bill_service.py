from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.bill_repo import BillRepository
from app.repositories.order_repo import OrderRepository
from app.repositories.tax_config_repo import TaxConfigRepository
from app.models.bill import Bill, BillStatusEnum, DiscountTypeEnum
from app.models.order import OrderStatusEnum
from app.models.tax_config import TaxConfig


class BillService:
    def __init__(self, db: Session):
        self.bill_repo = BillRepository(db)
        self.order_repo = OrderRepository(db)
        self.tax_repo = TaxConfigRepository(db)
        self.db = db

    def _compute_item_tax(
        self, line_total: float, tax_cfg: TaxConfig
    ) -> tuple[float, float, float]:
        """
        Returns (cgst, sgst, igst) for a single line item.
        For inclusive pricing the tax is extracted from the price;
        for exclusive pricing the tax is added on top.
        The caller uses the exclusive flag to decide whether to add to grand_total.
        """
        if tax_cfg.is_inclusive:
            taxable_base = line_total / (1 + tax_cfg.total_rate / 100)
        else:
            taxable_base = line_total

        if tax_cfg.is_igst_mode:
            return 0.0, 0.0, taxable_base * (tax_cfg.igst_rate / 100)
        return (
            taxable_base * (tax_cfg.cgst_rate / 100),
            taxable_base * (tax_cfg.sgst_rate / 100),
            0.0,
        )

    def _calculate_tax(self, order, default_tax: TaxConfig):
        """
        Iterates all active order items, computes aggregated tax breakdown.
        Returns dict with cgst, sgst, igst, total_tax, exclusive_tax, is_tax_inclusive.
        exclusive_tax is what gets added to subtotal to arrive at grand_total.
        """
        total_cgst = total_sgst = total_igst = exclusive_tax = 0.0

        for item in order.items:
            if item.is_cancelled:
                continue

            line_total = item.unit_price * item.quantity
            tax_cfg = (
                item.menu_item.category.tax_config
                if item.menu_item.category.tax_config and item.menu_item.category.tax_config.is_active
                else default_tax
            )

            if not tax_cfg:
                continue

            cgst, sgst, igst = self._compute_item_tax(line_total, tax_cfg)
            total_cgst += cgst
            total_sgst += sgst
            total_igst += igst

            if not tax_cfg.is_inclusive:
                exclusive_tax += cgst + sgst + igst

        total_tax = round(total_cgst + total_sgst + total_igst, 2)

        # is_tax_inclusive snapshot: True only if system default says so and there
        # are no exclusive-priced items (used for print label, not for calculation)
        is_inclusive_snapshot = (
            default_tax.is_inclusive if default_tax else False
        ) and exclusive_tax == 0.0

        return {
            "cgst_amount": round(total_cgst, 2),
            "sgst_amount": round(total_sgst, 2),
            "igst_amount": round(total_igst, 2),
            "total_tax": total_tax,
            "exclusive_tax": round(exclusive_tax, 2),
            "is_tax_inclusive": is_inclusive_snapshot,
        }

    def _build_print_data(self, bill: Bill) -> dict:
        order = bill.order
        items = [
            {
                "menu_item_name": item.menu_item.name,
                "variant_name": item.variant.variant_name if item.variant else None,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "line_total": round(item.unit_price * item.quantity, 2),
            }
            for item in order.items
            if not item.is_cancelled
        ]
        return {
            "id": bill.id,
            "bill_number": bill.bill_number,
            "order_number": order.order_number,
            "table_number": order.table.table_number,
            "captain_name": order.captain.name,
            "customer_name": order.customer.name if order.customer else None,
            "items": items,
            "subtotal": bill.subtotal,
            "discount_type": bill.discount_type,
            "discount_value": bill.discount_value,
            "discount_amount": bill.discount_amount,
            "discount_reason": bill.discount_reason,
            "taxable_amount": bill.taxable_amount,
            "cgst_amount": bill.cgst_amount,
            "sgst_amount": bill.sgst_amount,
            "igst_amount": bill.igst_amount,
            "total_tax": bill.total_tax,
            "is_tax_inclusive": bill.is_tax_inclusive,
            "grand_total": bill.grand_total,
            "status": bill.status,
            "notes": bill.notes,
            "created_at": bill.created_at,
            "settled_at": bill.settled_at,
        }

    def generate(self, order_id: int, created_by_id: int) -> Bill:
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

        if order.status in (OrderStatusEnum.completed, OrderStatusEnum.cancelled):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot generate bill for a {order.status} order"
            )

        existing = self.bill_repo.get_by_order_id(order_id)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"An active bill ({existing.bill_number}) already exists for this order"
            )

        active_items = [i for i in order.items if not i.is_cancelled]
        if not active_items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order has no active items to bill"
            )

        default_tax = self.tax_repo.get_default()
        tax_data = self._calculate_tax(order, default_tax)

        subtotal = round(order.total_amount, 2)
        taxable_amount = subtotal  # no discount yet — Phase 3 adds this
        grand_total = round(subtotal + tax_data["exclusive_tax"], 2)

        bill = Bill(
            bill_number=self.bill_repo.get_next_bill_number(),
            order_id=order_id,
            subtotal=subtotal,
            discount_type=DiscountTypeEnum.none,
            discount_value=0.0,
            discount_amount=0.0,
            taxable_amount=taxable_amount,
            cgst_amount=tax_data["cgst_amount"],
            sgst_amount=tax_data["sgst_amount"],
            igst_amount=tax_data["igst_amount"],
            total_tax=tax_data["total_tax"],
            is_tax_inclusive=tax_data["is_tax_inclusive"],
            grand_total=grand_total,
            status=BillStatusEnum.draft,
            created_by=created_by_id,
        )

        return self.bill_repo.create(bill)

    def get_by_id(self, bill_id: int) -> Bill:
        bill = self.bill_repo.get_by_id(bill_id)
        if not bill:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bill not found")
        return bill

    def get_all(self, status: str = None, order_id: int = None,
                date_from=None, date_to=None, skip: int = 0, limit: int = 50):
        return self.bill_repo.get_all(status, order_id, date_from, date_to, skip, limit)

    def get_print_data(self, bill_id: int) -> dict:
        bill = self.get_by_id(bill_id)
        return self._build_print_data(bill)

    def cancel(self, bill_id: int, cancelled_by_id: int) -> Bill:
        bill = self.get_by_id(bill_id)
        if bill.status == BillStatusEnum.settled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot cancel a settled bill"
            )
        if bill.status == BillStatusEnum.cancelled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bill is already cancelled"
            )
        bill.status = BillStatusEnum.cancelled
        bill.cancelled_at = datetime.now(timezone.utc)
        bill.cancelled_by = cancelled_by_id
        return self.bill_repo.update(bill)
