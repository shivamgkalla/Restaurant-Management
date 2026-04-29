import uuid
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.order_repo import OrderRepository
from app.repositories.order_item_repo import OrderItemRepository
from app.repositories.kot_repo import KOTRepository
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.models.order import Order, OrderStatusEnum
from app.models.order_item import OrderItem
from app.models.menu_item import MenuItem, ItemVariant
from app.models.kot import KOT
from app.models.restaurant_table import TableStatusEnum

class OrderService:
    def __init__(self, db: Session):
        self.order_repo = OrderRepository(db)
        self.item_repo = OrderItemRepository(db)
        self.kot_repo = KOTRepository(db)
        self.table_repo = RestaurantTableRepository(db)
        self.db = db

    def _generate_order_number(self) -> str:
        return f"ORD-{uuid.uuid4().hex[:8].upper()}"

    def _generate_kot_number(self) -> str:
        return f"KOT-{uuid.uuid4().hex[:6].upper()}"

    def _get_item_price(self, menu_item_id: int, variant_id: int = None) -> float:
        menu_item = self.db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
        if not menu_item:
            raise HTTPException(status_code=404, detail=f"Menu item {menu_item_id} not found")
        if not menu_item.is_available:
            raise HTTPException(status_code=400, detail=f"Menu item '{menu_item.name}' is not available")
        price = float(menu_item.base_price)
        if variant_id:
            variant = self.db.query(ItemVariant).filter(ItemVariant.id == variant_id).first()
            if not variant:
                raise HTTPException(status_code=404, detail=f"Variant {variant_id} not found")
            price += float(variant.extra_price)
        return price

    def get_all(self, captain_id: int = None, status: str = None, table_id: int = None, skip: int = 0, limit: int = 50):
        return self.order_repo.get_all(captain_id, status, table_id, skip, limit)

    def get_by_id(self, order_id: int):
        order = self.order_repo.get_by_id(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    def create(self, data: dict, captain_id: int):
        table = self.table_repo.get_by_id(data["table_id"])
        if not table:
            raise HTTPException(status_code=404, detail="Table not found")
        if self.order_repo.get_active_by_table(data["table_id"]):
            raise HTTPException(status_code=400, detail="Table already has an active order")

        order = Order(
            order_number=self._generate_order_number(),
            table_id=data["table_id"],
            captain_id=captain_id,
            customer_id=data.get("customer_id"),
            notes=data.get("notes"),
            total_amount=0.0,
        )
        created_order = self.order_repo.create(order)

        total = 0.0
        for item_data in data.get("items", []):
            price = self._get_item_price(item_data["menu_item_id"], item_data.get("variant_id"))
            qty = item_data.get("quantity", 1)
            total += price * qty
            self.item_repo.create(OrderItem(
                order_id=created_order.id,
                menu_item_id=item_data["menu_item_id"],
                variant_id=item_data.get("variant_id"),
                quantity=qty,
                unit_price=price,
                special_instructions=item_data.get("special_instructions"),
            ))

        created_order.total_amount = round(total, 2)
        self.order_repo.update(created_order)

        self.kot_repo.create(KOT(
            kot_number=self._generate_kot_number(),
            order_id=created_order.id,
            station_id=data.get("station_id"),
            is_urgent=data.get("is_urgent", False),
        ))

        table.status = TableStatusEnum.occupied
        self.table_repo.update(table)

        return self.order_repo.get_by_id(created_order.id)

    def update_status(self, order_id: int, new_status: OrderStatusEnum, current_role: str = None):
        order = self.get_by_id(order_id)

        role_transitions = {
            OrderStatusEnum.preparing: ["kitchen", "admin"],
            OrderStatusEnum.ready: ["kitchen", "admin"],
            OrderStatusEnum.served: ["captain", "admin"],
            OrderStatusEnum.completed: ["cashier", "admin"],
        }
        if new_status in role_transitions and current_role:
            allowed = role_transitions[new_status]
            if current_role not in allowed:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Only {allowed} can set status to '{new_status}'"
                )

        order.status = new_status
        if new_status == OrderStatusEnum.completed:
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
        self.item_repo.cancel_all_by_order(order_id)
        table = self.table_repo.get_by_id(order.table_id)
        if table:
            table.status = TableStatusEnum.available
            self.table_repo.update(table)
        return self.order_repo.update(order)