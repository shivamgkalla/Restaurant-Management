from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.bill_repo import BillRepository
from app.repositories.order_repo import OrderRepository
from app.repositories.tax_config_repo import TaxConfigRepository
from app.repositories.discount_config_repo import DiscountConfigRepository
from app.models.bill import Bill, BillStatusEnum, DiscountTypeEnum
from app.models.discount_config import DiscountConfigTypeEnum
from app.models.order import OrderStatusEnum
from app.models.tax_config import TaxConfig
from app.models.user import Staff


class BillService:
    def __init__(self, db: Session):
        self.bill_repo = BillRepository(db)
        self.order_repo = OrderRepository(db)
        self.tax_repo = TaxConfigRepository(db)
        self.discount_config_repo = DiscountConfigRepository(db)
        self.db = db

    def _compute_item_tax(
        self, line_total: float, tax_cfg: TaxConfig
    ) -> tuple[float, float, float]:
        """
        Returns (cgst, sgst, igst) for a single line item.

        If tax is inclusive, tax is already inside the price so we extract it from the total.
        If tax is exclusive, tax is calculated on top of the price.
        The caller tracks exclusive taxes separately to decide what gets added to the grand total.
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

    def _calculate_tax(self, order, default_tax: TaxConfig, discount_ratio: float = 0.0):
        """
        Goes through all active items and adds up the tax amounts.

        discount_ratio proportionally reduces each item's line total before tax is computed.
        This preserves the correct GST slab per item when a bill-level discount is applied before tax.
        Passing 0.0 (the default) means no discount — used for bill generation and discount removal.

        Items whose tax is already inside the price do not increase the grand total.
        Only items with tax added on top contribute to exclusive_tax, which gets added to the subtotal.
        is_tax_inclusive is just a display label on the bill — it is not used for any calculation.
        """
        total_cgst = total_sgst = total_igst = exclusive_tax = 0.0

        for item in order.items:
            if item.is_cancelled:
                continue

            # Apply the discount share for this item proportionally before computing tax
            line_total = round(item.unit_price * item.quantity * (1 - discount_ratio), 4)
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

        # Only mark the bill as "tax inclusive" if the system default says so
        # AND every item in the order has tax baked into its price.
        # This is a display label on the printed bill — it does not affect any calculation.
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
                detail=f"Cannot generate bill for a {order.status.value} order"
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
        # taxable_amount equals subtotal here because no discount is applied yet.
        # Billing - Discount Management will update this once a discount is applied.
        taxable_amount = subtotal
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

    def apply_discount(self, bill_id: int, data, current_staff: Staff) -> Bill:
        bill = self.get_by_id(bill_id)

        if bill.status != BillStatusEnum.draft:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Discount can only be applied to a draft bill")

        # Block discount changes once payments have been recorded to prevent
        # the grand_total changing underneath already-collected money
        if bill.payments:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot modify discount after payments have been recorded. Remove payments first."
            )

        discount_cfg = self.discount_config_repo.get_by_id(data.discount_config_id)
        if not discount_cfg or not discount_cfg.is_active:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Discount config not found or inactive")

        if data.discount_value > discount_cfg.max_value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Discount value exceeds the maximum allowed ({discount_cfg.max_value})"
            )

        role = current_staff.role.name

        if role == "cashier" and data.discount_value > discount_cfg.approval_threshold:
            # Cashier is above their self-approval limit — a manager or admin must co-sign.
            # Admin Controls module (Module 9) will add email OTP verification on top of
            # this staff ID check when that module is built.
            if not data.approved_by:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Discounts above {discount_cfg.approval_threshold} require manager or admin approval. Provide approved_by."
                )
            approver = self.db.query(Staff).filter(
                Staff.id == data.approved_by,
                Staff.is_active == True
            ).first()
            if not approver:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Approver not found or inactive")
            if approver.role.name not in ("admin", "manager"):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Approver must be a manager or admin")

        subtotal = bill.subtotal

        if discount_cfg.discount_type == DiscountConfigTypeEnum.percentage:
            discount_amount = round(subtotal * data.discount_value / 100, 2)
        else:
            # Cap fixed discount at subtotal so grand_total never goes negative
            discount_amount = round(min(data.discount_value, subtotal), 2)

        taxable_amount = round(subtotal - discount_amount, 2)
        default_tax = self.tax_repo.get_default()

        if discount_cfg.discount_before_tax:
            discount_ratio = discount_amount / subtotal if subtotal > 0 else 0.0
            tax_data = self._calculate_tax(bill.order, default_tax, discount_ratio)
            grand_total = round(taxable_amount + tax_data["exclusive_tax"], 2)
        else:
            # Discount after tax: compute tax on full subtotal, subtract discount from grand total
            tax_data = self._calculate_tax(bill.order, default_tax, 0.0)
            grand_total = round(max(subtotal + tax_data["exclusive_tax"] - discount_amount, 0.0), 2)

        # Map DiscountConfigTypeEnum to DiscountTypeEnum for the bill column
        bill.discount_type = DiscountTypeEnum(discount_cfg.discount_type.value)
        bill.discount_value = data.discount_value
        bill.discount_amount = discount_amount
        bill.discount_reason = data.discount_reason
        bill.discount_approved_by = data.approved_by
        bill.taxable_amount = taxable_amount
        bill.cgst_amount = tax_data["cgst_amount"]
        bill.sgst_amount = tax_data["sgst_amount"]
        bill.igst_amount = tax_data["igst_amount"]
        bill.total_tax = tax_data["total_tax"]
        bill.is_tax_inclusive = tax_data["is_tax_inclusive"]
        bill.grand_total = grand_total

        return self.bill_repo.update(bill)

    def remove_discount(self, bill_id: int) -> Bill:
        bill = self.get_by_id(bill_id)

        if bill.status != BillStatusEnum.draft:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Discount can only be removed from a draft bill")

        if bill.payments:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot remove discount after payments have been recorded. Remove payments first."
            )

        if bill.discount_type == DiscountTypeEnum.none:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This bill has no discount applied")

        bill.discount_type = DiscountTypeEnum.none
        bill.discount_value = 0.0
        bill.discount_amount = 0.0
        bill.discount_reason = None
        bill.discount_approved_by = None

        # Recalculate tax on the full subtotal with no discount
        default_tax = self.tax_repo.get_default()
        tax_data = self._calculate_tax(bill.order, default_tax, 0.0)

        bill.taxable_amount = bill.subtotal
        bill.cgst_amount = tax_data["cgst_amount"]
        bill.sgst_amount = tax_data["sgst_amount"]
        bill.igst_amount = tax_data["igst_amount"]
        bill.total_tax = tax_data["total_tax"]
        bill.is_tax_inclusive = tax_data["is_tax_inclusive"]
        bill.grand_total = round(bill.subtotal + tax_data["exclusive_tax"], 2)

        return self.bill_repo.update(bill)

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
