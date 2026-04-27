from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.order_item_repo import OrderItemRepository
from app.repositories.order_repo import OrderRepository
from app.models.order_item import OrderItem
from app.models.order import OrderStatusEnum

class OrderItemService:
    def __init__(self, db: Session):
        self.item_repo = OrderItemRepository(db)
        self.order_repo = OrderRepository(db)

    def get_by_order(self, order_id: int):
        return self.item_repo.get_by_order(order_id)

    def add_item(self, order_id: int, data: dict):
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        if order.status in [OrderStatusEnum.completed, OrderStatusEnum.cancelled]:
            raise HTTPException(status_code=400, detail="Cannot modify completed or cancelled order")

        item = OrderItem(
            order_id=order_id,
            menu_item_id=data["menu_item_id"],
            variant_id=data.get("variant_id"),
            quantity=data.get("quantity", 1),
            unit_price=data["unit_price"],
            special_instructions=data.get("special_instructions"),
        )
        return self.item_repo.create(item)

    def update_item(self, item_id: int, data: dict):
        item = self.item_repo.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Order item not found")
        for field in ["quantity", "special_instructions", "variant_id"]:
            if data.get(field) is not None:
                setattr(item, field, data[field])
        return self.item_repo.update(item)

    def cancel_item(self, item_id: int):
        item = self.item_repo.get_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Order item not found")
        self.item_repo.cancel(item)
        return {"message": "Item cancelled successfully"}