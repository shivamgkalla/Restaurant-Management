from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.bill import BillStatusEnum, DiscountTypeEnum


class BillGenerateRequest(BaseModel):
    order_id: int


class BillOut(BaseModel):
    id: int
    bill_number: str
    order_id: int
    subtotal: float
    discount_type: DiscountTypeEnum
    discount_value: float
    discount_amount: float
    discount_reason: Optional[str] = None
    discount_approved_by: Optional[int] = None
    taxable_amount: float
    cgst_amount: float
    sgst_amount: float
    igst_amount: float
    total_tax: float
    is_tax_inclusive: bool
    grand_total: float
    status: BillStatusEnum
    notes: Optional[str] = None
    created_by: int
    settled_at: Optional[datetime] = None
    settled_by: Optional[int] = None
    cancelled_at: Optional[datetime] = None
    cancelled_by: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BillLineItemOut(BaseModel):
    menu_item_name: str
    variant_name: Optional[str] = None
    quantity: int
    unit_price: float
    line_total: float


class BillPrintOut(BaseModel):
    id: int
    bill_number: str
    order_number: str
    table_number: str
    captain_name: str
    customer_name: Optional[str] = None
    items: List[BillLineItemOut]
    subtotal: float
    discount_type: DiscountTypeEnum
    discount_value: float
    discount_amount: float
    discount_reason: Optional[str] = None
    taxable_amount: float
    cgst_amount: float
    sgst_amount: float
    igst_amount: float
    total_tax: float
    is_tax_inclusive: bool
    grand_total: float
    status: BillStatusEnum
    notes: Optional[str] = None
    created_at: datetime
    settled_at: Optional[datetime] = None
