from datetime import datetime
from typing import Optional
from app.schemas.base import BaseResponse
from app.schemas.role import RoleResponse


class StaffResponse(BaseResponse):
    id: int
    employee_id: str
    name: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    date_of_joining: Optional[datetime] = None
    emergency_contact: Optional[str] = None
    photo_url: Optional[str] = None
    notes: Optional[str] = None
    username: str
    is_active: bool
    role: RoleResponse
    created_at: datetime
    updated_at: Optional[datetime] = None
    resignation_date: Optional[datetime] = None


class StaffListResponse(BaseResponse):
    total: int
    items: list[StaffResponse]