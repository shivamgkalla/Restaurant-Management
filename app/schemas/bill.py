from pydantic import AliasChoices, BaseModel, Field, field_validator
from typing import Optional, List, Any
from datetime import datetime
from app.models.bill import BillStatusEnum, DiscountTypeEnum
from app.models.discount_config import DiscountConfigTypeEnum


class BillGenerateRequest(BaseModel):
    order_id: int
    # Fixed currency discount (e.g. 200). Omit or null = no discount. Capped at order subtotal server-side.
    # Accept JSON key `discount` or `discount_amount` so older frontends still work.
    discount_amount: Optional[float] = Field(
        default=None,
        validation_alias=AliasChoices("discount_amount", "discount"),
        description="Optional fixed discount in currency (e.g. 200, 250). Send as discount_amount or discount. Applied to subtotal before tax.",
        examples=[200],
    )

    @field_validator("discount_amount", mode="before")
    @classmethod
    def coerce_discount_amount(cls, v: Any) -> Any:
        if v is None or v == "":
            return None
        if isinstance(v, str):
            s = v.strip().replace(",", "")
            if s == "":
                return None
            try:
                v = float(s)
            except ValueError:
                raise ValueError(
                    "discount_amount must be a number (e.g. 200). Percentage strings are not supported."
                )
        if isinstance(v, (int, float)) and v == 0:
            return None
        return v

    @field_validator("discount_amount")
    @classmethod
    def discount_amount_valid(cls, v: Optional[float]) -> Optional[float]:
        if v is None:
            return None
        if v < 0:
            raise ValueError("discount_amount cannot be negative")
        return v


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
    otp: str  # OTP required to apply discount

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


class BillListOut(BaseModel):
    total: int
    skip: int
    limit: int
    items: List[BillOut]


class BillLineItemOut(BaseModel):
    menu_item_name: str
    variant_name: Optional[str] = None
    quantity: int
    unit_price: float
    line_total: float


class BillPrintPaymentOut(BaseModel):
    id: int
    bill_id: int
    payment_method: str
    amount: float
    reference_number: Optional[str] = None
    collected_by: int
    created_at: datetime


class BillPrintOut(BaseModel):
    id: int
    bill_number: str
    order_number: str
    table_number: str
    captain_name: Optional[str] = None
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
    payments: List[BillPrintPaymentOut] = []