from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.restaurant_table import TableStatusEnum
from app.schemas.table_zone import ZoneOut

class TableCreate(BaseModel):
    table_number: str
    seating_capacity: int
    zone_id: int
    notes: Optional[str] = None
    pos_x: Optional[float] = 0.0
    pos_y: Optional[float] = 0.0

class TableUpdate(BaseModel):
    table_number: Optional[str] = None
    seating_capacity: Optional[int] = None
    zone_id: Optional[int] = None
    notes: Optional[str] = None
    pos_x: Optional[float] = None
    pos_y: Optional[float] = None

class TableStatusUpdate(BaseModel):
    status: TableStatusEnum

class TableOut(BaseModel):
    id: int
    table_number: str
    seating_capacity: int
    status: TableStatusEnum
    notes: Optional[str] = None
    is_active: bool
    pos_x: float
    pos_y: float
    created_at: datetime
    zone: Optional[ZoneOut] = None

    class Config:
        from_attributes = True