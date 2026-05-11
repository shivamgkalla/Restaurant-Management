from pydantic import BaseModel
from typing import Optional, List
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


# ── KOT Details API schemas ───────────────────────────────────────────────────

# Station grouping
class KOTItemDetail(BaseModel):
    order_item_id: int
    menu_item_id: int
    menu_item_name: str
    category_id: Optional[int] = None
    category_name: Optional[str] = None
    quantity: int
    unit_price: float
    is_prepared: bool = False
    special_instructions: Optional[str] = None

class KOTStationGroup(BaseModel):
    station_id: int
    station_name: str
    items: List[KOTItemDetail]

# Category grouping
class KOTCategoryItem(BaseModel):
    order_item_id: int
    menu_item_id: int
    menu_item_name: str
    count: int
    is_prepared: bool = False
    special_instructions: Optional[str] = None

class KOTCategoryGroup(BaseModel):
    category_id: int
    category_name: str
    total_count: int          # sum of quantity where is_prepared=False
    items: List[KOTCategoryItem]

# Final response per order
class KOTDetailOut(BaseModel):
    order_id: int
    order_number: str
    table_id: Optional[int] = None
    table_name: Optional[str] = None
    stations: List[KOTStationGroup]
    categories: List[KOTCategoryGroup]