import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator

from app.models.customer import CustomerType


# ──────────────────────────────────────────────
# Request Schemas
# ──────────────────────────────────────────────

class CustomerCreateRequest(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    notes: Optional[str] = None
    customer_type: Optional[CustomerType] = CustomerType.new

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Customer name cannot be blank.")
        return v.strip()

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v == "":
            return None
        v = v.strip()
        # Remove spaces, dashes, brackets, plus sign
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if not re.fullmatch(r"\d{10}", cleaned):
            raise ValueError("Phone must be exactly 10 digits")
        return cleaned

    @field_validator("email", mode="before")
    @classmethod
    def empty_email_to_none(cls, v):
        if v is None:
            return None
        if isinstance(v, str) and not v.strip():
            return None
        return v.strip() if isinstance(v, str) else v

    @field_validator("date_of_birth", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        if v == "" or v is None:
            return None
        return v


class CustomerUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    notes: Optional[str] = None
    customer_type: Optional[CustomerType] = None

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.strip():
            raise ValueError("Customer name cannot be blank.")
        return v.strip() if v else v

    @field_validator("email", mode="before")
    @classmethod
    def empty_email_to_none(cls, v):
        if v is None:
            return None
        if isinstance(v, str) and not v.strip():
            return None
        return v.strip() if isinstance(v, str) else v

    @field_validator("date_of_birth", mode="before")
    @classmethod
    def empty_string_to_none(cls, v):
        if v == "" or v is None:
            return None
        return v


# ──────────────────────────────────────────────
# Response Schemas
# ──────────────────────────────────────────────

class CustomerResponse(BaseModel):
    id: int
    customer_id: str
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    notes: Optional[str] = None
    customer_type: CustomerType
    is_active: bool
    registered_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


class CustomerListResponse(BaseModel):
    total: int
    customers: list[CustomerResponse]