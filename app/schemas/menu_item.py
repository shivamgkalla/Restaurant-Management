from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.menu_item import FoodTypeEnum
from app.schemas.category import CategoryOut
from pydantic import BaseModel, Field
 
class VariantCreate(BaseModel):
    variant_name: str = "Regular"
    extra_price: Optional[float] = 0.0
    is_available: Optional[bool] = True
 
class VariantOut(BaseModel):
    id: int
    variant_name: str
    extra_price: float
    is_available: bool
 
    class Config:
        from_attributes = True
 
class MenuItemCreate(BaseModel):
    category_id: int
    name: str
    description: Optional[str] = None
    base_price: float
    food_type: Optional[FoodTypeEnum] = FoodTypeEnum.veg
    spice_level: Optional[int] = 0
    prep_time_minutes: Optional[int] = 15
    is_chef_special: Optional[bool] = False
    variants: List[VariantCreate] = Field(default_factory=lambda: [VariantCreate()])
 
class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[float] = None
    category_id: Optional[int] = None
    food_type: Optional[FoodTypeEnum] = None
    spice_level: Optional[int] = None
    prep_time_minutes: Optional[int] = None
    is_chef_special: Optional[bool] = None
    is_available: Optional[bool] = None
 
class MenuItemOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    base_price: float
    food_type: FoodTypeEnum
    spice_level: int
    prep_time_minutes: int
    is_chef_special: bool
    is_available: bool
    is_archived: bool
    created_at: datetime
    category: CategoryOut
    variants: List[VariantOut] = []
 
    class Config:
        from_attributes = True