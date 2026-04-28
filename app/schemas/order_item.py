from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderItemAdd(BaseModel):
    menu_item_id: int
    variant_id: Optional[int] = None
    quantity: int = 1
    special_instructions: Optional[str] = None

class OrderItemUpdate(BaseModel):
    quantity: Optional[int] = None
    variant_id: Optional[int] = None
    special_instructions: Optional[str] = None

class OrderItemOut(BaseModel):
    id: int
    order_id: int
    menu_item_id: int
    variant_id: Optional[int] = None
    quantity: int
    unit_price: float
    special_instructions: Optional[str] = None
    is_cancelled: bool
    created_at: datetime

    class Config:
        from_attributes = True