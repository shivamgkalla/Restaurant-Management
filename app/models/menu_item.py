from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class FoodTypeEnum(str, enum.Enum):
    veg = "veg"
    non_veg = "non_veg"
    vegan = "vegan"

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    base_price = Column(Float, nullable=False)
    sku = Column(String(50), nullable=True, unique=True)
    food_type = Column(Enum(FoodTypeEnum), default=FoodTypeEnum.veg)
    spice_level = Column(Integer, default=0)
    prep_time_minutes = Column(Integer, default=15)
    is_chef_special = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    category = relationship("Category", back_populates="items")
    variants = relationship("ItemVariant", back_populates="item")

class ItemVariant(Base):
    __tablename__ = "item_variants"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=False)
    variant_name = Column(String(100), nullable=False)
    extra_price = Column(Float, default=0.0)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

    item = relationship("MenuItem", back_populates="variants")