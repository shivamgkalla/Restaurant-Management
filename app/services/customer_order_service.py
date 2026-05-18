import uuid
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.order import Order, OrderStatusEnum
from app.models.order_item import OrderItem
from app.models.kot import KOT
from app.models.menu_item import MenuItem
from app.models.category import Category
from app.models.restaurant_table import RestaurantTable, TableStatusEnum
from app.models.table_zone import TableZone
from app.models.user import Staff
from app.models.role import Role
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes


class CustomerOrderService:
    def __init__(self, db: Session):
        self.db = db

    def _generate_order_number(self) -> str:
        return f"ORD-{uuid.uuid4().hex[:8].upper()}"

    def _generate_kot_number(self) -> str:
        return f"KOT-{uuid.uuid4().hex[:6].upper()}"

    def _get_item_price(self, menu_item_id: int) -> tuple[float | None, str | None]:
        item = self.db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
        if not item:
            return None, f"Menu item {menu_item_id} not found"
        if not item.is_available:
            return None, f"'{item.name}' is not available"
        if not item.station or not item.station.is_active:
            return None, f"'{item.name}' cannot be ordered — kitchen station is inactive"
        return float(item.base_price), None

    def _auto_assign_captain(self) -> Optional[int]:
        # Find active captains and pick the one with fewest open orders
        captain_role = self.db.query(Role).filter(Role.name == "captain").first()
        if not captain_role:
            return None
        captains = self.db.query(Staff).filter(
            Staff.role_id == captain_role.id,
            Staff.is_active == True,
        ).all()
        if not captains:
            return None

        open_statuses = [
            OrderStatusEnum.pending,
            OrderStatusEnum.preparing,
            OrderStatusEnum.ready,
            OrderStatusEnum.served,
        ]
        best_captain = None
        min_count = float("inf")
        for captain in captains:
            count = self.db.query(func.count(Order.id)).filter(
                Order.captain_id == captain.id,
                Order.status.in_(open_statuses),
                Order.is_deleted == False,
            ).scalar()
            if count < min_count:
                min_count = count
                best_captain = captain
        return best_captain.id if best_captain else None

    def get_available_tables(self) -> CustomResponse:
        tables = (
            self.db.query(RestaurantTable)
            .outerjoin(TableZone, RestaurantTable.zone_id == TableZone.id)
            .filter(
                RestaurantTable.status == TableStatusEnum.available,
                RestaurantTable.is_active == True,
            )
            .order_by(RestaurantTable.table_number)
            .all()
        )
        result = [
            {
                "id": t.id,
                "table_number": t.table_number,
                "seating_capacity": t.seating_capacity,
                "zone_name": t.zone.name if t.zone else None,
            }
            for t in tables
        ]
        return CustomResponse(C.OK, "Available tables fetched successfully", result)

    def get_menu(self) -> CustomResponse:
        categories = (
            self.db.query(Category)
            .options(joinedload(Category.items))
            .filter(Category.is_active == True)
            .all()
        )
        result = []
        for cat in categories:
            active_items = [i for i in cat.items if i.is_available and not i.is_archived]
            result.append({
                "id": cat.id,
                "name": cat.name,
                "description": cat.description,
                "items": [
                    {
                        "id": i.id,
                        "name": i.name,
                        "description": i.description,
                        "base_price": float(i.base_price),
                        "food_type": i.food_type,
                        "spice_level": i.spice_level,
                        "prep_time_minutes": i.prep_time_minutes,
                        "is_chef_special": i.is_chef_special,
                    }
                    for i in active_items
                ],
            })
        return CustomResponse(C.OK, "Menu fetched successfully", result)

    def create_order(self, data: dict, customer_id: int) -> CustomResponse:
        # Validate items and calculate total
        prepared_items = []
        total = 0.0
        for item_data in data.get("items", []):
            price, error = self._get_item_price(item_data["menu_item_id"])
            if error:
                return CustomResponse(C.BAD_REQUEST, error)
            qty = item_data.get("quantity", 1)
            total += price * qty
            prepared_items.append({
                "menu_item_id": item_data["menu_item_id"],
                "quantity": qty,
                "unit_price": price,
                "special_instructions": item_data.get("special_instructions"),
            })

        captain_id = self._auto_assign_captain()

        try:
            order = Order(
                order_number=self._generate_order_number(),
                table_id=None,
                captain_id=captain_id,
                customer_id=customer_id,
                notes=data.get("notes"),
                total_amount=round(total, 2),
            )
            self.db.add(order)
            self.db.flush()

            for item in prepared_items:
                self.db.add(OrderItem(
                    order_id=order.id,
                    menu_item_id=item["menu_item_id"],
                    variant_id=None,
                    quantity=item["quantity"],
                    unit_price=item["unit_price"],
                    special_instructions=item["special_instructions"],
                ))

            self.db.add(KOT(
                kot_number=self._generate_kot_number(),
                order_id=order.id,
                is_urgent=data.get("is_urgent", False),
            ))

            self.db.commit()
            self.db.refresh(order)
            return CustomResponse(C.CREATED, "Order placed successfully", self._serialize(order))
        except Exception:
            self.db.rollback()
            raise

    def get_my_orders(self, customer_id: int) -> CustomResponse:
        orders = (
            self.db.query(Order)
            .options(joinedload(Order.items))
            .filter(Order.customer_id == customer_id, Order.is_deleted == False)
            .order_by(Order.created_at.desc())
            .all()
        )
        return CustomResponse(C.OK, "Orders fetched successfully", [self._serialize(o) for o in orders])

    def get_my_order(self, order_id: int, customer_id: int) -> CustomResponse:
        order = self.db.query(Order).options(joinedload(Order.items)).filter(
            Order.id == order_id, Order.is_deleted == False
        ).first()
        if not order:
            return CustomResponse(C.NOT_FOUND, "Order not found")
        if order.customer_id != customer_id:
            return CustomResponse(C.FORBIDDEN, "Access denied")
        return CustomResponse(C.OK, "Order fetched successfully", self._serialize(order))

    def add_items(self, order_id: int, customer_id: int, items: list) -> CustomResponse:
        order = self.db.query(Order).options(joinedload(Order.items)).filter(
            Order.id == order_id, Order.is_deleted == False
        ).first()
        if not order:
            return CustomResponse(C.NOT_FOUND, "Order not found")
        if order.customer_id != customer_id:
            return CustomResponse(C.FORBIDDEN, "Access denied")
        if order.status != OrderStatusEnum.pending:
            return CustomResponse(C.BAD_REQUEST, "Items can only be added to a pending order")

        added_total = 0.0
        new_items = []
        for item_data in items:
            price, error = self._get_item_price(item_data["menu_item_id"])
            if error:
                return CustomResponse(C.BAD_REQUEST, error)
            qty = item_data.get("quantity", 1)
            added_total += price * qty
            new_items.append({
                "menu_item_id": item_data["menu_item_id"],
                "quantity": qty,
                "unit_price": price,
                "special_instructions": item_data.get("special_instructions"),
            })

        try:
            for item in new_items:
                self.db.add(OrderItem(
                    order_id=order.id,
                    menu_item_id=item["menu_item_id"],
                    variant_id=None,
                    quantity=item["quantity"],
                    unit_price=item["unit_price"],
                    special_instructions=item["special_instructions"],
                ))
            order.total_amount = round(float(order.total_amount) + added_total, 2)
            self.db.commit()
            self.db.refresh(order)
            return CustomResponse(C.OK, "Items added successfully", self._serialize(order))
        except Exception:
            self.db.rollback()
            raise

    def _serialize(self, order: Order) -> dict:
        return {
            "id": order.id,
            "order_number": order.order_number,
            "customer_id": order.customer_id,
            "table_id": order.table_id,
            "captain_id": order.captain_id,
            "status": order.status,
            "notes": order.notes,
            "total_amount": float(order.total_amount),
            "created_at": order.created_at,
            "updated_at": order.updated_at,
            "items": [
                {
                    "id": i.id,
                    "menu_item_id": i.menu_item_id,
                    "quantity": i.quantity,
                    "unit_price": i.unit_price,
                    "special_instructions": i.special_instructions,
                    "is_cancelled": i.is_cancelled,
                }
                for i in order.items
                if not i.is_cancelled
            ],
        }
