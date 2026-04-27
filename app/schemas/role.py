"""
Role response schema.
"""
from datetime import datetime
from typing import Optional
from app.schemas.base import BaseResponse


class RoleResponse(BaseResponse):
    id: int
    name: str
    description: Optional[str] = None
    created_at: datetime
