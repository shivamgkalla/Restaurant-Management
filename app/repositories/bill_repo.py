from sqlalchemy.orm import Session
from app.models.bill import Bill, BillStatusEnum


class BillRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, bill_id: int) -> Bill:
        return self.db.query(Bill).filter(Bill.id == bill_id).first()

    def get_by_order_id(self, order_id: int) -> Bill:
        # Returns the most recent non-cancelled bill for an order
        return self.db.query(Bill).filter(
            Bill.order_id == order_id,
            Bill.status != BillStatusEnum.cancelled
        ).first()

    def get_all(
        self,
        status: str = None,
        order_id: int = None,
        date_from=None,
        date_to=None,
        skip: int = 0,
        limit: int = 50,
    ) -> list[Bill]:
        query = self.db.query(Bill)
        if status:
            query = query.filter(Bill.status == status)
        if order_id:
            query = query.filter(Bill.order_id == order_id)
        if date_from:
            query = query.filter(Bill.created_at >= date_from)
        if date_to:
            query = query.filter(Bill.created_at <= date_to)
        return query.order_by(Bill.created_at.desc()).offset(skip).limit(limit).all()

    def get_next_bill_number(self) -> str:
        last = self.db.query(Bill).order_by(Bill.id.desc()).first()
        if not last:
            return "BILL-0001"
        try:
            num = int(last.bill_number.split("-")[1]) + 1
        except (IndexError, ValueError):
            num = self.db.query(Bill).count() + 1
        return f"BILL-{str(num).zfill(4)}"

    def create(self, bill: Bill) -> Bill:
        self.db.add(bill)
        self.db.commit()
        self.db.refresh(bill)
        return bill

    def update(self, bill: Bill) -> Bill:
        self.db.commit()
        self.db.refresh(bill)
        return bill
