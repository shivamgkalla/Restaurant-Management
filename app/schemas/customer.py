from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator

from app.models.customer import CustomerType


# ──────────────────────────────────────────────
# Request Schemas
# ──────────────────────────────────────────────

class CustomerCreateRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    notes: Optional[str] = None

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Customer name cannot be blank.")
        return v.strip()

    @field_validator("phone")
    @classmethod
    def phone_must_not_be_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Phone number cannot be blank.")
        return v.strip()


class CustomerUpdateRequest(BaseModel):
    name: Optional[str] = None
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


# ──────────────────────────────────────────────
# Response Schemas
# ──────────────────────────────────────────────

class CustomerResponse(BaseModel):
    id: int
    customer_id: str
    name: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    notes: Optional[str] = None
    customer_type: CustomerType          # ← add this line
    is_active: bool
    registered_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


class CustomerListResponse(BaseModel):
    total: int
    customers: list[CustomerResponse]