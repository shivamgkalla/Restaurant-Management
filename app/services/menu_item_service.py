from typing import Optional

from sqlalchemy.orm import Session

from app.repositories.menu_item_repo import MenuItemRepository, VariantRepository
from app.repositories.category_repo import CategoryRepository
from app.repositories.kitchen_station_repo import KitchenStationRepository
from app.models.menu_item import MenuItem, ItemVariant
from app.models.order_item import OrderItem
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.utils.pagination.params import PaginationParams
import uuid

C = HttpConstants.HttpResponseCodes


class MenuItemService:
    def __init__(self, db: Session):
        self.db = db
        self.item_repo    = MenuItemRepository(db)
        self.cat_repo     = CategoryRepository(db)
        self.station_repo = KitchenStationRepository(db)
        self.variant_repo = VariantRepository(db)

    def get_all(
        self,
        params:      PaginationParams,
        category_id: Optional[int] = None,
        search:      Optional[str] = None,
    ) -> CustomResponse:
        result = self.item_repo.get_all(params, category_id=category_id, search=search)
        return CustomResponse(C.OK, "Menu items fetched successfully", data=result.items, meta=result.meta)

    def get_by_id(self, item_id: int) -> CustomResponse:
        item = self.item_repo.get_by_id(item_id)
        if not item:
            return CustomResponse(C.NOT_FOUND, "Menu item not found")
        return CustomResponse(C.OK, "Menu item fetched successfully", data=item)

    def create(self, data: dict) -> CustomResponse:
        if not self.cat_repo.get_by_id(data["category_id"]):
            return CustomResponse(C.BAD_REQUEST, "Category not found")
        station = self.station_repo.get_by_id(data["station_id"])
        if not station or not station.is_active:
            return CustomResponse(C.BAD_REQUEST, "Kitchen station not found or inactive")

        sku = data.get("sku") or f"SKU-{uuid.uuid4().hex[:8].upper()}"
        if data.get("sku") and self.item_repo.get_by_sku(data["sku"]):
            return CustomResponse(C.CONFLICT, "SKU already exists")

        item = MenuItem(
            category_id       = data["category_id"],
            station_id        = data["station_id"],
            name              = data["name"],
            description       = data.get("description"),
            base_price        = data["base_price"],
            sku               = sku,
            food_type         = data.get("food_type", "veg"),
            spice_level       = data.get("spice_level", 0),
            prep_time_minutes = data.get("prep_time_minutes", 15),
            is_chef_special   = data.get("is_chef_special", False),
        )
        created = self.item_repo.create(item)

        for v in data.get("variants", []):
            self.variant_repo.create(ItemVariant(
                item_id      = created.id,
                variant_name = v["variant_name"],
                extra_price  = v.get("extra_price", 0.0),
                is_available = v.get("is_available", True),
            ))

        item = self.item_repo.get_by_id(created.id)
        return CustomResponse(C.CREATED, "Menu item created successfully", data=item)

    def update(self, item_id: int, data: dict) -> CustomResponse:
        item = self.item_repo.get_by_id(item_id)
        if not item:
            return CustomResponse(C.NOT_FOUND, "Menu item not found")

        if "station_id" in data and data["station_id"] is not None:
            station = self.station_repo.get_by_id(data["station_id"])
            if not station or not station.is_active:
                return CustomResponse(C.BAD_REQUEST, "Kitchen station not found or inactive")

        for field in ["name", "description", "base_price", "category_id",
                      "station_id", "food_type", "spice_level", "prep_time_minutes",
                      "is_chef_special", "is_available"]:
            if field in data and data[field] is not None:
                setattr(item, field, data[field])

        item = self.item_repo.update(item)
        return CustomResponse(C.OK, "Menu item updated successfully", data=item)

    def delete(self, item_id: int) -> CustomResponse:
        item = self.item_repo.get_by_id_any(item_id)
        if not item:
            return CustomResponse(C.NOT_FOUND, "Menu item not found")

        linked = (
            self.db.query(OrderItem.id)
            .filter(OrderItem.menu_item_id == item_id)
            .first()
        )
        if linked:
            return CustomResponse(
                C.BAD_REQUEST,
                "Cannot delete this menu item because it is linked to existing orders.",
            )

        for v in list(self.variant_repo.get_by_item(item_id)):
            self.db.delete(v)
        self.db.delete(item)
        self.db.commit()
        return CustomResponse(C.OK, "Menu item deleted successfully")

    def toggle_availability(self, item_id: int) -> CustomResponse:
        item = self.item_repo.get_by_id(item_id)
        if not item:
            return CustomResponse(C.NOT_FOUND, "Menu item not found")
        item.is_available = not item.is_available
        item = self.item_repo.update(item)
        return CustomResponse(C.OK, "Availability updated successfully", data=item)
    
    def get_all_with_search(self, search: str = None) -> CustomResponse:
        items = self.item_repo.get_all_with_search(search)
        return CustomResponse(C.OK, "Menu items fetched successfully", data=items)