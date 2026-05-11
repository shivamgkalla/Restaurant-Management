from pydantic import BaseModel, field_validator
import re


class CustomerRegisterRequest(BaseModel):
    name: str
    phone: str
    password: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not re.fullmatch(r"\d{10}", v):
            raise ValueError("Phone must be exactly 10 digits")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Name cannot be blank")
        return v.strip()


class CustomerLoginRequest(BaseModel):
    phone: str
    password: str


class CustomerTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    customer_id: int
    name: str
    phone: str
