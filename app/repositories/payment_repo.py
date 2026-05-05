from sqlalchemy.orm import Session
from app.models.payment import Payment


class PaymentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_bill_id(self, bill_id: int) -> list[Payment]:
        return self.db.query(Payment).filter(Payment.bill_id == bill_id).all()

    def get_by_id(self, payment_id: int) -> Payment:
        return self.db.query(Payment).filter(Payment.id == payment_id).first()

    def get_total_paid(self, bill_id: int) -> float:
        payments = self.get_by_bill_id(bill_id)
        # Cast to float — Numeric columns return Decimal which cannot be mixed with
        # float arithmetic in the service layer.
        return round(float(sum(p.amount for p in payments)), 2) if payments else 0.0

    def delete(self, payment: Payment) -> None:
        self.db.delete(payment)
        self.db.commit()
