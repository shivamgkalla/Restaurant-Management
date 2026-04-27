from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class KitchenStationCreate(BaseModel):
    name: str
    printer_ip: Optional[str] = None
    printer_name: Optional[str] = None

class KitchenStationUpdate(BaseModel):
    name: Optional[str] = None
    printer_ip: Optional[str] = None
    printer_name: Optional[str] = None
    is_active: Optional[bool] = None

class KitchenStationOut(BaseModel):
    id: int
    name: str
    printer_ip: Optional[str] = None
    printer_name: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True