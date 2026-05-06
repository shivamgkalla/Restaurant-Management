from pydantic import BaseModel, field_validator, model_validator
from typing import Optional
from datetime import datetime
from app.models.payment import PaymentMethodEnum


class AddPaymentRequest(BaseModel):
    payment_method: PaymentMethodEnum
    amount: float
    reference_number: Optional[str] = None
    # The physical RFID card UID scanned at the counter — required when payment_method is rfid
    card_uid: Optional[str] = None

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
        return self


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
