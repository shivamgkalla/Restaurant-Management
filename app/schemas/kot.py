from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class KOTOut(BaseModel):
    id: int
    kot_number: str
    order_id: int
    station_id: Optional[int] = None
    is_printed: bool
    is_urgent: bool
    created_at: datetime

    class Config:
        from_attributes = True