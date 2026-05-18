from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.models.order import OrderStatusEnum


class CustomerOrderItemRequest(BaseModel):
    menu_item_id: int
    quantity: int = Field(default=1, ge=1)
    special_instructions: Optional[str] = None


class CustomerOrderCreateRequest(BaseModel):
    notes: Optional[str] = None
    is_urgent: Optional[bool] = False
    items: List[CustomerOrderItemRequest] = Field(min_length=1)


class CustomerTableOut(BaseModel):
    id: int
    table_number: str
    seating_capacity: int
    zone_name: Optional[str] = None

    class Config:
        from_attributes = True


class CustomerMenuItemOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    base_price: float
    food_type: str
    spice_level: int
    prep_time_minutes: int
    is_chef_special: bool

    class Config:
        from_attributes = True


class CustomerCategoryOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    items: List[CustomerMenuItemOut] = []

    class Config:
        from_attributes = True


class CustomerOrderItemOut(BaseModel):
    id: int
    menu_item_id: int
    quantity: int
    unit_price: float
    special_instructions: Optional[str] = None
    is_cancelled: bool

    class Config:
        from_attributes = True


class CustomerOrderOut(BaseModel):
    id: int
    order_number: str
    customer_id: Optional[int] = None
    table_id: Optional[int] = None
    status: OrderStatusEnum
    notes: Optional[str] = None
    total_amount: float
    captain_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    items: List[CustomerOrderItemOut] = []

    class Config:
        from_attributes = True
