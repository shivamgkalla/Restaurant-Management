from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.menu_item_repo import MenuItemRepository, VariantRepository
from app.repositories.category_repo import CategoryRepository
from app.models.menu_item import MenuItem, ItemVariant
import uuid

class MenuItemService:
    def __init__(self, db: Session):
        self.item_repo = MenuItemRepository(db)
        self.cat_repo = CategoryRepository(db)
        self.variant_repo = VariantRepository(db)

    def get_all(self, category_id: int = None):
        return self.item_repo.get_all(category_id)

    def get_by_id(self, item_id: int):
        item = self.item_repo.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found")
        return item

    def create(self, data: dict):
        if not self.cat_repo.get_by_id(data["category_id"]):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category not found")
        sku = data.get("sku") or f"SKU-{uuid.uuid4().hex[:8].upper()}"
        if data.get("sku") and self.item_repo.get_by_sku(data["sku"]):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="SKU already exists")
        item = MenuItem(
            category_id=data["category_id"],
            name=data["name"],
            description=data.get("description"),
            base_price=data["base_price"],
            sku=sku,
            food_type=data.get("food_type", "veg"),
            spice_level=data.get("spice_level", 0),
            prep_time_minutes=data.get("prep_time_minutes", 15),
            is_chef_special=data.get("is_chef_special", False),
        )
        created = self.item_repo.create(item)
        for v in data.get("variants", []):
            self.variant_repo.create(ItemVariant(
                item_id=created.id,
                variant_name=v["variant_name"],
                extra_price=v.get("extra_price", 0.0),
                is_available=v.get("is_available", True),
            ))
        return self.item_repo.get_by_id(created.id)

    def update(self, item_id: int, data: dict):
        item = self.get_by_id(item_id)
        for field in ["name", "description", "base_price", "category_id",
                      "food_type", "spice_level", "prep_time_minutes",
                      "is_chef_special", "is_available"]:
            if field in data and data[field] is not None:
                setattr(item, field, data[field])
        return self.item_repo.update(item)

    def archive(self, item_id: int):
        item = self.get_by_id(item_id)
        self.item_repo.archive(item)
        return {"message": "Item archived successfully"}

    def toggle_availability(self, item_id: int):
        item = self.get_by_id(item_id)
        item.is_available = not item.is_available
        return self.item_repo.update(item)