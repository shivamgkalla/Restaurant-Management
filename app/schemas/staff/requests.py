from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator
from app.core.config import settings


class StaffCreateRequest(BaseModel):
    # Identity
    employee_id: str
    name: str
    phone: str
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    date_of_joining: Optional[datetime] = None
    emergency_contact: Optional[str] = None
    notes: Optional[str] = None

    # Auth
    role_id: int
    username: str
    password: str

    @field_validator("username")
    @classmethod
    def normalize_username(cls, v: str) -> str:
        v = v.strip().lower()
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters")
        if not v.replace("_", "").replace(".", "").isalnum():
            raise ValueError("Username may only contain letters, numbers, underscores, and dots")
        return v

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v: str) -> str:
        if len(v) < settings.MIN_PASSWORD_LENGTH:
            raise ValueError(
                f"Password must be at least {settings.MIN_PASSWORD_LENGTH} characters"
            )
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        digits = v.replace("+", "").replace("-", "").replace(" ", "")
        if not digits.isdigit():
            raise ValueError("Phone must contain only digits (spaces, +, - allowed)")
        if len(digits) < 7:
            raise ValueError("Phone number too short")
        return v

    @field_validator("employee_id")
    @classmethod
    def normalize_employee_id(cls, v: str) -> str:
        return v.strip().upper()


class StaffUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    notes: Optional[str] = None
    role_id: Optional[int] = None
    photo_url: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None

    @field_validator("username")
    @classmethod
    def normalize_username(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        v = v.strip().lower()
        if len(v) < 3:
            raise ValueError("Username must be at least 3 characters")
        if not v.replace("_", "").replace(".", "").isalnum():
            raise ValueError("Username may only contain letters, numbers, underscores, and dots")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        digits = v.replace("+", "").replace("-", "").replace(" ", "")
        if not digits.isdigit():
            raise ValueError("Phone must contain only digits")
        return v

    @field_validator("password")
    @classmethod
    def password_min_length(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        if len(v) < settings.MIN_PASSWORD_LENGTH:
            raise ValueError(
                f"Password must be at least {settings.MIN_PASSWORD_LENGTH} characters"
            )
        return v


class StaffDeactivateRequest(BaseModel):
    reason: Optional[str] = None
    resignation_date: Optional[datetime] = None