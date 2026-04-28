from sqlalchemy.orm import Session
from app.models.order import Order, OrderStatusEnum

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, captain_id: int = None, status: str = None, table_id: int = None, skip: int = 0, limit: int = 50) -> list[Order]:
        query = self.db.query(Order).filter(Order.is_deleted == False)
        if captain_id:
            query = query.filter(Order.captain_id == captain_id)
        if status:
            query = query.filter(Order.status == status)
        if table_id:
            query = query.filter(Order.table_id == table_id)
        return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

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