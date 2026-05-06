from sqlalchemy.orm import Session
from app.models.rfid_card_transaction import RFIDCardTransaction
from typing import Optional


class RFIDTransactionRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, txn: RFIDCardTransaction) -> RFIDCardTransaction:
        self.db.add(txn)
        # Caller is responsible for committing — transactions are always part of a larger operation
        return txn

    def get_by_card(self, card_id: int, skip: int = 0, limit: int = 50):
        query = self.db.query(RFIDCardTransaction).filter(RFIDCardTransaction.card_id == card_id)
        total = query.count()
        items = query.order_by(RFIDCardTransaction.created_at.desc()).offset(skip).limit(limit).all()
        return total, items
