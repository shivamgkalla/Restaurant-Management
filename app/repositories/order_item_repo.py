from sqlalchemy.orm import Session
from app.models.order_item import OrderItem

class OrderItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_order(self, order_id: int) -> list[OrderItem]:
        return self.db.query(OrderItem).filter(
            OrderItem.order_id == order_id,
            OrderItem.is_cancelled == False
        ).all()

    def get_by_id(self, item_id: int) -> OrderItem:
        return self.db.query(OrderItem).filter(OrderItem.id == item_id).first()

    def create(self, item: OrderItem) -> OrderItem:
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def update(self, item: OrderItem) -> OrderItem:
        self.db.commit()
        self.db.refresh(item)
        return item

    def cancel(self, item: OrderItem) -> None:
        item.is_cancelled = True
        self.db.commit()