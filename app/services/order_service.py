import uuid
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.order_repo import OrderRepository
from app.repositories.order_item_repo import OrderItemRepository
from app.repositories.kot_repo import KOTRepository
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.models.order import Order, OrderStatusEnum
from app.models.order_item import OrderItem
from app.models.kot import KOT
from app.models.restaurant_table import TableStatusEnum

class OrderService:
    def __init__(self, db: Session):
        self.order_repo = OrderRepository(db)
        self.item_repo = OrderItemRepository(db)
        self.kot_repo = KOTRepository(db)
        self.table_repo = RestaurantTableRepository(db)

    def _generate_order_number(self) -> str:
        return f"ORD-{uuid.uuid4().hex[:8].upper()}"

    def _generate_kot_number(self) -> str:
        return f"KOT-{uuid.uuid4().hex[:6].upper()}"

    def get_all(self, captain_id: int = None, status: str = None, table_id: int = None):
        return self.order_repo.get_all(captain_id, status, table_id)

    def get_by_id(self, order_id: int):
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    def create(self, data: dict, captain_id: int):
        table = self.table_repo.get_by_id(data["table_id"])
        if not table:
            raise HTTPException(status_code=404, detail="Table not found")

        active_order = self.order_repo.get_active_by_table(data["table_id"])
        if active_order:
            raise HTTPException(status_code=400, detail="Table already has an active order")

        order = Order(
            order_number=self._generate_order_number(),
            table_id=data["table_id"],
            captain_id=captain_id,
            customer_id=data.get("customer_id"),
            notes=data.get("notes"),
        )
        created_order = self.order_repo.create(order)

        for item_data in data.get("items", []):
            order_item = OrderItem(
                order_id=created_order.id,
                menu_item_id=item_data["menu_item_id"],
                variant_id=item_data.get("variant_id"),
                quantity=item_data.get("quantity", 1),
                unit_price=item_data["unit_price"],
                special_instructions=item_data.get("special_instructions"),
            )
            self.item_repo.create(order_item)

        kot = KOT(
            kot_number=self._generate_kot_number(),
            order_id=created_order.id,
            station_id=data.get("station_id"),
            is_urgent=data.get("is_urgent", False),
        )
        self.kot_repo.create(kot)

        table.status = TableStatusEnum.occupied
        self.table_repo.update(table)

        return self.order_repo.get_by_id(created_order.id)

    def update_status(self, order_id: int, status: OrderStatusEnum):
        order = self.get_by_id(order_id)
        order.status = status
        if status == OrderStatusEnum.completed:
            table = self.table_repo.get_by_id(order.table_id)
            if table:
                table.status = TableStatusEnum.available
                self.table_repo.update(table)
        return self.order_repo.update(order)

    def cancel(self, order_id: int):
        order = self.get_by_id(order_id)
        if order.status == OrderStatusEnum.completed:
            raise HTTPException(status_code=400, detail="Cannot cancel completed order")
        order.status = OrderStatusEnum.cancelled
        order.is_deleted = True
        table = self.table_repo.get_by_id(order.table_id)
        if table:
            table.status = TableStatusEnum.available
            self.table_repo.update(table)
        return self.order_repo.update(order)