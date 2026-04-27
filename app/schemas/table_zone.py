from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ZoneCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ZoneUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class ZoneOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True