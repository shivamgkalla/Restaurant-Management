from typing import Optional

from sqlalchemy.orm import Session

from app.models.order import Order, OrderStatusEnum
from app.models.customer import Customer
from app.models.restaurant_table import RestaurantTable
from app.utils.pagination.paginate import paginate
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        params: PaginationParams,
        search: Optional[str] = None,
    ) -> PagedResult:
        query = (
            self.db.query(Order)
            .outerjoin(Customer, Order.customer_id == Customer.id)
            .outerjoin(RestaurantTable, Order.table_id == RestaurantTable.id)
            .filter(Order.is_deleted == False)
        )

        if search:
            term = f"%{search.strip()}%"
            query = query.filter(
                Order.order_number.ilike(term)
                | Customer.name.ilike(term)
                | Customer.phone.ilike(term)
                | RestaurantTable.table_number.ilike(term)
            )

        query = query.order_by(Order.created_at.desc())
        return paginate(query, params)

    def get_by_id(self, order_id: int) -> Order:
        return self.db.query(Order).filter(
            Order.id == order_id,
            Order.is_deleted == False
        ).first()

    def get_by_order_number(self, order_number: str) -> Order:
        return self.db.query(Order).filter(Order.order_number == order_number).first()

    def get_active_by_table(self, table_id: int) -> Order:
        return self.db.query(Order).filter(
            Order.table_id == table_id,
            Order.is_deleted == False,
            Order.status.notin_([OrderStatusEnum.completed, OrderStatusEnum.cancelled])
        ).first()

    def create(self, order: Order) -> Order:
        self.db.add(order)
        self.db.commit()
        self.db.refresh(order)
        return order

    def update(self, order: Order) -> Order:
        self.db.commit()
        self.db.refresh(order)
        return order