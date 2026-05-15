import uuid
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.order_repo import OrderRepository
from app.repositories.order_item_repo import OrderItemRepository
from app.repositories.kot_repo import KOTRepository
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.models.order import Order, OrderStatusEnum
from app.models.order_item import OrderItem
from app.models.menu_item import MenuItem
from app.models.customer import Customer
from app.models.kot import KOT
from app.models.restaurant_table import TableStatusEnum
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.utils.pagination.params import PaginationParams
from app.services.otp_service import OTPService
from app.models.otp import OTPActionEnum

C = HttpConstants.HttpResponseCodes

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

    def _get_item_price(self, menu_item_id: int) -> float:
        menu_item = self.db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
        if not menu_item:
            raise HTTPException(status_code=404, detail=f"Menu item {menu_item_id} not found")
        if not menu_item.is_available:
            raise HTTPException(status_code=400, detail=f"Menu item '{menu_item.name}' is not available")
        if not menu_item.station or not menu_item.station.is_active:
            raise HTTPException(
                status_code=400,
                detail=f"Menu item '{menu_item.name}' cannot be ordered because its kitchen station is inactive",
            )
        price = float(menu_item.base_price)
        return price

    def _normalize_customer_id(
        self, customer_id: Optional[int], *, required: bool = False
    ) -> Optional[int]:
        """
        When required is False (e.g. order update), 0/None/negative means no customer.
        When required is True (order create), a valid existing customer id is mandatory.
        """
        invalid = customer_id is None or customer_id <= 0
        if invalid:
            if required:
                raise HTTPException(status_code=400, detail="customer_id is required")
            return None
        customer = self.db.query(Customer).filter(Customer.id == customer_id).first()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return customer_id

    def get_all(
        self,
        params: PaginationParams,
        search: Optional[str] = None,
    ) -> CustomResponse:
        result = self.order_repo.get_all(params, search=search)
        enriched_orders = [self._serialize_order_for_list(order) for order in result.items]
        return CustomResponse(C.OK, "Orders fetched successfully", data=enriched_orders, meta=result.meta)

    def _serialize_order_for_list(self, order: Order) -> dict:
        item_details = [
            {
                "order_item_id": item.id,
                "menu_item_id": item.menu_item_id,
                "menu_item_name": item.menu_item.name if item.menu_item else None,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
            }
            for item in order.items
            if not item.is_cancelled
        ]

        return {
            "id": order.id,
            "order_number": order.order_number,
            "table_id": order.table_id,
            "table_name": order.table.table_number if order.table else None,
            "captain_id": order.captain_id,
            "customer_id": order.customer_id,
            "customer_name": order.customer.name if order.customer else None,
            "status": order.status,
            "notes": order.notes,
            "total_amount": order.total_amount,
            "is_deleted": order.is_deleted,
            "created_at": order.created_at,
            "updated_at": order.updated_at,
            "item_details": item_details,
        }

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
        customer_id = self._normalize_customer_id(data.get("customer_id"), required=True)

        prepared_items: list[dict] = []
        total = 0.0
        for item_data in data.get("items", []):
            price = self._get_item_price(item_data["menu_item_id"])
            qty = item_data.get("quantity", 1)
            total += price * qty
            prepared_items.append(
                {
                    "menu_item_id": item_data["menu_item_id"],
                    "quantity": qty,
                    "unit_price": price,
                    "special_instructions": item_data.get("special_instructions"),
                }
            )
        requested_total = data.get("totalAmount")
        if requested_total is not None and requested_total < 0:
            raise HTTPException(status_code=400, detail="totalAmount cannot be negative")
        final_total_amount = round(float(requested_total), 2) if requested_total is not None else round(total, 2)

        try:
            order = Order(
                order_number=self._generate_order_number(),
                table_id=data["table_id"],
                captain_id=captain_id,
                customer_id=customer_id,
                notes=data.get("notes"),
                total_amount=final_total_amount,
            )
            self.db.add(order)
            self.db.flush()  # order.id available before commit

            for item in prepared_items:
                self.db.add(
                    OrderItem(
                        order_id=order.id,
                        menu_item_id=item["menu_item_id"],
                        variant_id=None,
                        quantity=item["quantity"],
                        unit_price=item["unit_price"],
                        special_instructions=item["special_instructions"],
                    )
                )

            self.db.add(
                KOT(
                    kot_number=self._generate_kot_number(),
                    order_id=order.id,
                    is_urgent=data.get("is_urgent", False),
                )
            )

            table.status = TableStatusEnum.occupied
            self.db.commit()
            self.db.refresh(order)
            return self.order_repo.get_by_id(order.id)
        except Exception:
            self.db.rollback()
            raise
    
    def _has_other_active_order_on_table(self, table_id: int, order_id: int) -> bool:
        return self.order_repo.get_active_by_table_excluding_order(table_id, order_id) is not None

    def update(self, order_id: int, data: dict, captain_id: int, otp_code: str = None):

        # Verify OTP before updating
        if not otp_code:
            raise HTTPException(status_code=400, detail="OTP is required to edit an order")
        otp_valid = OTPService(self.db).verify_otp(
            OTPActionEnum.edit_order, order_id, otp_code
        )
        if not otp_valid:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")

        order = self.get_by_id(order_id)
        if order.status in [OrderStatusEnum.completed, OrderStatusEnum.cancelled]:
            raise HTTPException(status_code=400, detail="Cannot update completed or cancelled order")
        if "items" not in data or not data.get("items"):
            raise HTTPException(status_code=400, detail="Order must contain at least one item")

        new_table_id = data.get("table_id", order.table_id)
        if new_table_id != order.table_id:
            new_table = self.table_repo.get_by_id(new_table_id)
            if not new_table:
                raise HTTPException(status_code=404, detail="Table not found")
            if self._has_other_active_order_on_table(new_table_id, order.id):
                raise HTTPException(status_code=400, detail="Destination table already has an active order")
        else:
            new_table = None

        prepared_items: list[dict] = []
        total = 0.0
        for item_data in data.get("items", []):
            price = self._get_item_price(item_data["menu_item_id"])
            qty = item_data.get("quantity", 1)
            total += price * qty
            prepared_items.append(
                {
                    "menu_item_id": item_data["menu_item_id"],
                    "quantity": qty,
                    "unit_price": price,
                    "special_instructions": item_data.get("special_instructions"),
                }
            )
        requested_total = data.get("totalAmount")
        if requested_total is not None and requested_total < 0:
            raise HTTPException(status_code=400, detail="totalAmount cannot be negative")
        final_total_amount = round(float(requested_total), 2) if requested_total is not None else round(total, 2)

        old_table_id = order.table_id

        try:
            order.table_id = new_table_id
            if "customer_id" in data:
                order.customer_id = self._normalize_customer_id(data.get("customer_id"))
            order.notes = data.get("notes", order.notes)
            order.captain_id = captain_id
            order.total_amount = final_total_amount

            self.db.query(OrderItem).filter(
                OrderItem.order_id == order.id
            ).delete(synchronize_session=False)

            for item in prepared_items:
                self.db.add(
                    OrderItem(
                        order_id=order.id,
                        menu_item_id=item["menu_item_id"],
                        variant_id=None,
                        quantity=item["quantity"],
                        unit_price=item["unit_price"],
                        special_instructions=item["special_instructions"],
                    )
                )

            if new_table_id != old_table_id:
                old_table = self.table_repo.get_by_id(old_table_id)
                if old_table:
                    old_table.status = TableStatusEnum.available
                if new_table:
                    new_table.status = TableStatusEnum.occupied

            self.db.commit()
            self.db.refresh(order)
            return self.order_repo.get_by_id(order.id)
        except Exception:
            self.db.rollback()
            raise

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

    def assign_captain(self, order_id: int, captain_id: int):
        from app.models.user import Staff
        order = self.get_by_id(order_id)
        captain = self.db.query(Staff).filter(Staff.id == captain_id, Staff.is_active == True).first()
        if not captain:
            raise HTTPException(status_code=404, detail="Staff member not found or inactive")
        if captain.role.name not in ("captain", "admin", "manager"):
            raise HTTPException(status_code=400, detail="Staff member is not a captain")
        order.captain_id = captain_id
        return self.order_repo.update(order)

    def cancel(self, order_id: int, otp_code: str):
        from app.services.otp_service import OTPService
        from app.models.otp import OTPActionEnum

        # Verify OTP before cancelling
        otp_valid = OTPService(self.db).verify_otp(
            OTPActionEnum.cancel_order, order_id, otp_code
        )
        if not otp_valid:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")

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