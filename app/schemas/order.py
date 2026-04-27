from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.order import OrderStatusEnum

class OrderItemCreate(BaseModel):
    menu_item_id: int
    variant_id: Optional[int] = None
    quantity: int = 1
    unit_price: float
    special_instructions: Optional[str] = None

class OrderCreate(BaseModel):
    table_id: int
    customer_id: Optional[int] = None
    notes: Optional[str] = None
    station_id: Optional[int] = None
    is_urgent: Optional[bool] = False
    items: List[OrderItemCreate]

class OrderStatusUpdate(BaseModel):
    status: OrderStatusEnum

class OrderItemOut(BaseModel):
    id: int
    menu_item_id: int
    variant_id: Optional[int] = None
    quantity: int
    unit_price: float
    special_instructions: Optional[str] = None
    is_cancelled: bool
    created_at: datetime

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    order_number: str
    table_id: int
    captain_id: int
    customer_id: Optional[int] = None
    status: OrderStatusEnum
    notes: Optional[str] = None
    is_deleted: bool
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True