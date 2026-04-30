from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime
from app.models.bill import BillStatusEnum, DiscountTypeEnum
from app.models.discount_config import DiscountConfigTypeEnum


class BillGenerateRequest(BaseModel):
    order_id: int


class ApplyDiscountRequest(BaseModel):
    discount_config_id: int
    discount_value: float
    # Mandatory — every discount must have a stated reason for the audit trail
    discount_reason: str

    # Staff ID of the manager or admin who approved this discount.
    # Required when a cashier applies a discount above the config's approval_threshold.
    # Admin Controls module (Module 9) will add email OTP as an additional
    # verification step on top of this when that module is built.
    approved_by: Optional[int] = None

    @field_validator("discount_value")
    @classmethod
    def value_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("discount_value must be greater than zero")
        return v

    @field_validator("discount_reason")
    @classmethod
    def reason_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("discount_reason cannot be empty")
        return v.strip()


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
