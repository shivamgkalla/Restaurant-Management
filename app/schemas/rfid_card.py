from pydantic import BaseModel, field_validator, model_validator
from typing import Optional, List, Literal
from datetime import datetime
from app.models.rfid_card import RFIDCardStatusEnum
from app.models.rfid_card_transaction import RFIDTransactionTypeEnum, RFIDLoadPaymentMethodEnum


# ── Request schemas ──────────────────────────────────────────────────────────

class RegisterCardRequest(BaseModel):
    """Register a new physical RFID card into the system. Card starts with zero balance."""
    card_uid: str

    @field_validator("card_uid")
    @classmethod
    def uid_must_not_be_empty(cls, v):
        v = v.strip()
        if not v:
            raise ValueError("card_uid cannot be empty")
        return v


class BindCardRequest(BaseModel):
    """
    Bind an available card to a customer and load the initial balance.
    The customer pays real money at the counter; the system records the virtual load.
    """
    customer_id: int
    # Amount the customer is loading onto the card right now (can be 0 if pre-registered)
    initial_load_amount: float
    # How the customer paid for this load at the counter
    payment_method: RFIDLoadPaymentMethodEnum
    # Required when payment_method is online (UPI ref, card txn ID, etc.)
    reference_number: Optional[str] = None

    @field_validator("initial_load_amount")
    @classmethod
    def amount_must_be_non_negative(cls, v):
        if v < 0:
            raise ValueError("initial_load_amount cannot be negative")
        return round(v, 2)

    @field_validator("reference_number")
    @classmethod
    def clean_reference(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v

    @model_validator(mode="after")
    def online_requires_reference(self):
        if self.payment_method == RFIDLoadPaymentMethodEnum.online and not self.reference_number:
            raise ValueError("reference_number is required for online loads")
        return self


class LoadCardRequest(BaseModel):
    """Top up an active card. Customer pays at counter; virtual balance increases."""
    amount: float
    payment_method: RFIDLoadPaymentMethodEnum
    reference_number: Optional[str] = None

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

    @model_validator(mode="after")
    def online_requires_reference(self):
        if self.payment_method == RFIDLoadPaymentMethodEnum.online and not self.reference_number:
            raise ValueError("reference_number is required for online loads")
        return self


class ClearCardRequest(BaseModel):
    """
    Clear a card after a customer's session ends — unbind from customer and reset to available.
    If the card still has a remaining balance, the staff refunds it to the customer physically.
    refund_method records how that physical refund was given (for the audit trail).
    """
    # Required only when the card has a remaining balance — how the refund was handed back
    refund_method: Optional[RFIDLoadPaymentMethodEnum] = None
    reference_number: Optional[str] = None
    note: Optional[str] = None

    @field_validator("reference_number")
    @classmethod
    def clean_reference(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v


# ── Response schemas ─────────────────────────────────────────────────────────

class RFIDCardOut(BaseModel):
    id: int
    card_uid: str
    status: RFIDCardStatusEnum
    balance: float
    customer_id: Optional[int] = None
    bound_at: Optional[datetime] = None
    bound_by: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RFIDCardTransactionOut(BaseModel):
    id: int
    card_id: int
    transaction_type: RFIDTransactionTypeEnum
    amount: float
    payment_method: Optional[RFIDLoadPaymentMethodEnum] = None
    reference_number: Optional[str] = None
    bill_id: Optional[int] = None
    performed_by: int
    note: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class RFIDCardListOut(BaseModel):
    total: int
    skip: int
    limit: int
    items: List[RFIDCardOut]


class RFIDCardTransactionListOut(BaseModel):
    total: int
    skip: int
    limit: int
    items: List[RFIDCardTransactionOut]
