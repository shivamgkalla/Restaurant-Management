from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class StaffSummaryResponse(BaseModel):
    id: int
    employee_id: str
    name: str
    username: str
    role: str

    model_config = {"from_attributes": True}


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int
    staff: StaffSummaryResponse

    model_config = {"from_attributes": True}


class TokenRefreshResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int


class SessionResponse(BaseModel):
    id: int
    staff_id: int
    device_info: Optional[str] = None
    ip_address: Optional[str] = None
    is_active: bool
    created_at: datetime
    expires_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    message: str
