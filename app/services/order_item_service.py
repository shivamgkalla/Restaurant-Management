import uuid
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.order_item_repo import OrderItemRepository
from app.repositories.order_repo import OrderRepository
from app.repositories.kot_repo import KOTRepository
from app.models.order_item import OrderItem
from app.models.order import OrderStatusEnum
from app.models.menu_item import MenuItem, ItemVariant
from app.models.kot import KOT

class OrderItemService:
    def __init__(self, db: Session):
        self.item_repo = OrderItemRepository(db)
        self.order_repo = OrderRepository(db)
        self.kot_repo = KOTRepository(db)
        self.db = db

    def _get_item_price(self, menu_item_id: int, variant_id: int = None) -> float:
        menu_item = self.db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
        if not menu_item:
            raise HTTPException(status_code=404, detail=f"Menu item {menu_item_id} not found")
        price = float(menu_item.base_price)
        if variant_id:
            variant = self.db.query(ItemVariant).filter(ItemVariant.id == variant_id).first()
            if variant:
                price += float(variant.extra_price)
        return price

    def get_by_order(self, order_id: int):
        return self.item_repo.get_by_order(order_id)

    def add_item(self, order_id: int, data: dict):
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        if order.status in [OrderStatusEnum.completed, OrderStatusEnum.cancelled]:
            raise HTTPException(status_code=400, detail="Cannot modify completed or cancelled order")

        price = self._get_item_price(data["menu_item_id"], data.get("variant_id"))
        qty = data.get("quantity", 1)

        created_item = self.item_repo.create(OrderItem(
            order_id=order_id,
            menu_item_id=data["menu_item_id"],
            variant_id=data.get("variant_id"),
            quantity=qty,
            unit_price=price,
            special_instructions=data.get("special_instructions"),
        ))

        order.total_amount = (order.total_amount or 0) + (price * qty)
        self.order_repo.update(order)

        self.kot_repo.create(KOT(
            kot_number=f"KOT-{uuid.uuid4().hex[:6].upper()}",
            order_id=order_id,
        ))

        return created_item

    def update_item(self, item_id: int, data: dict):
        item = self.item_repo.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Order item not found")
        for field in ["quantity", "special_instructions", "variant_id"]:
            if field in data and data[field] is not None:
                setattr(item, field, data[field])
        return self.item_repo.update(item)

    def cancel_item(self, item_id: int):
        item = self.item_repo.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Order item not found")
        self.item_repo.cancel(item)
        return {"message": "Item cancelled successfully"}