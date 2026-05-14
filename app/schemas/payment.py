from pydantic import BaseModel, field_validator, model_validator
from typing import Optional, List
from datetime import datetime
from app.models.payment import PaymentMethodEnum


class AddPaymentRequest(BaseModel):
    payment_method: PaymentMethodEnum
    amount: float
    reference_number: Optional[str] = None
    card_uid: Optional[str] = None

    @field_validator("payment_method", mode="before")
    @classmethod
    def lowercase_payment_method(cls, v):
        if isinstance(v, str):
            return v.lower()
        return v

    @field_validator("amount")
    @classmethod
    def amount_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("amount must be greater than zero")
        return round(v, 2)

    @field_validator("reference_number")
    @classmethod
    def clean_reference(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v

    @field_validator("card_uid")
    @classmethod
    def clean_card_uid(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v

    @model_validator(mode="after")
    def validate_method_requirements(self):
        if self.payment_method == PaymentMethodEnum.online and not self.reference_number:
            raise ValueError("reference_number is required for online payments")
        if self.payment_method == PaymentMethodEnum.rfid and not self.card_uid:
            raise ValueError("card_uid is required for RFID payments")
        if self.payment_method != PaymentMethodEnum.rfid:
            self.card_uid = None
        if self.payment_method != PaymentMethodEnum.online:
            self.reference_number = None
        return self


# ── Partial Payment ───────────────────────────────────────────────────────────

class PartialPaymentItem(BaseModel):
    payment_method: PaymentMethodEnum
    amount: float = 0.0
    reference_number: Optional[str] = None
    card_uid: Optional[str] = None

    @field_validator("payment_method", mode="before")
    @classmethod
    def lowercase_payment_method(cls, v):
        if isinstance(v, str):
            return v.lower()
        return v

    @field_validator("amount")
    @classmethod
    def amount_must_be_non_negative(cls, v):
        if v < 0:
            raise ValueError("amount cannot be negative")
        return round(v, 2)

    @field_validator("reference_number")
    @classmethod
    def clean_reference(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v

    @field_validator("card_uid")
    @classmethod
    def clean_card_uid(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v

    @model_validator(mode="after")
    def validate_method_requirements(self):
        if self.payment_method == PaymentMethodEnum.online and not self.reference_number:
            raise ValueError("reference_number is required for online payments")
        if self.payment_method == PaymentMethodEnum.rfid and not self.card_uid:
            raise ValueError("card_uid is required for RFID payments")
        if self.payment_method != PaymentMethodEnum.rfid:
            self.card_uid = None
        if self.payment_method != PaymentMethodEnum.online:
            self.reference_number = None
        return self


class PartialPaymentRequest(BaseModel):
    payments: List[PartialPaymentItem]

    model_config = {
        "json_schema_extra": {
            "example": {
                "payments": [
                    { "payment_method": "", "amount": 0 },
                    { "payment_method": "", "amount": 0, "reference_number": "" },
                    { "payment_method": "", "amount": 0, "card_uid": "" }
                ]
            }
        }
    }

    @model_validator(mode="before")
    @classmethod
    def filter_empty_payments(cls, values):
        # ✅ Empty payment_method wale items automatically skip ho jayenge
        if isinstance(values, dict) and "payments" in values:
            values["payments"] = [
                p for p in values["payments"]
                if isinstance(p, dict) and p.get("payment_method", "").strip() != ""
            ]
        return values

    @model_validator(mode="after")
    def validate_payments(self):
        if not self.payments:
            raise ValueError("At least one payment is required")
        if len(self.payments) > 5:
            raise ValueError("Maximum 5 payment methods allowed in a single request")
        methods = [p.payment_method for p in self.payments]
        if len(methods) != len(set(methods)):
            raise ValueError("Duplicate payment methods are not allowed in a single request")
        return self


class PartialPaymentOut(BaseModel):
    bill_id: int
    grand_total: float
    total_paid: float
    remaining: float
    is_settled: bool
    payments: List["PaymentOut"]


class PaymentOut(BaseModel):
    id: int
    bill_id: int
    payment_method: PaymentMethodEnum
    amount: float
    reference_number: Optional[str] = None
    collected_by: int
    created_at: datetime

    class Config:
        from_attributes = True


class PaymentRemoveOut(BaseModel):
    message: str