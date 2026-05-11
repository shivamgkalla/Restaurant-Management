from typing import Optional

from sqlalchemy.orm import Session, joinedload

from app.models.kot import KOT
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.menu_item import MenuItem
from app.models.category import Category
from app.models.kitchen_station import KitchenStation
from app.models.restaurant_table import RestaurantTable
from app.utils.pagination.paginate import paginate
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


class KOTRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_order(self, order_id: int) -> list[KOT]:
        return self.db.query(KOT).filter(KOT.order_id == order_id).all()

    def get_by_id(self, kot_id: int) -> KOT:
        return self.db.query(KOT).filter(KOT.id == kot_id).first()

    def create(self, kot: KOT) -> KOT:
        self.db.add(kot)
        self.db.commit()
        self.db.refresh(kot)
        return kot

    def update(self, kot: KOT) -> KOT:
        self.db.commit()
        self.db.refresh(kot)
        return kot

    # ── Order Item helpers ────────────────────────────────────────────────────

    def get_order_item_by_id(self, order_item_id: int) -> OrderItem:
        return self.db.query(OrderItem).filter(OrderItem.id == order_item_id).first()

    def update_order_item(self, item: OrderItem) -> OrderItem:
        self.db.commit()
        self.db.refresh(item)
        return item

    # ── KOT Details: paginated, orders with table + category grouped items ────

    def get_kot_details(
        self,
        params: PaginationParams,
        search: Optional[str] = None,
        category_id: Optional[int] = None,
    ) -> PagedResult:
        query = (
            self.db.query(Order)
            .join(OrderItem, OrderItem.order_id == Order.id)
            .join(MenuItem, MenuItem.id == OrderItem.menu_item_id)
            .join(KitchenStation, KitchenStation.id == MenuItem.station_id)
            .options(
                joinedload(Order.table),
                joinedload(Order.items)
                    .joinedload(OrderItem.menu_item)
                    .joinedload(MenuItem.station),
                joinedload(Order.items)
                    .joinedload(OrderItem.menu_item)
                    .joinedload(MenuItem.category),
            )
            .filter(Order.is_deleted == False)
            # sirf active/pending orders — completed hat jaayenge
            .filter(Order.status == "pending")
            # wo orders bhi hat jaayenge jinke saare items prepared ho chuke hain
            .filter(
                Order.items.any(
                    (OrderItem.is_prepared == False) & (OrderItem.is_cancelled == False)
                )
            )
        )

        if search:
            from app.models.restaurant_table import RestaurantTable
            term = f"%{search.strip()}%"
            query = query.filter(
                Order.order_number.ilike(term) |
                Order.table.has(RestaurantTable.table_number.ilike(term))
            )

        if category_id is not None:
            query = query.filter(MenuItem.category_id == category_id)

        query = query.distinct().order_by(Order.created_at.desc())
        return paginate(query, params)