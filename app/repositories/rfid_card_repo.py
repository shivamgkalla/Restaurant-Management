from sqlalchemy.orm import Session
from app.models.rfid_card import RFIDCard, RFIDCardStatusEnum
from typing import Optional


class RFIDCardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, card_id: int) -> Optional[RFIDCard]:
        return self.db.query(RFIDCard).filter(RFIDCard.id == card_id).first()

    def get_by_uid(self, card_uid: str) -> Optional[RFIDCard]:
        return self.db.query(RFIDCard).filter(RFIDCard.card_uid == card_uid).first()

    def get_all(self, skip: int = 0, limit: int = 50, status: Optional[RFIDCardStatusEnum] = None):
        query = self.db.query(RFIDCard)
        if status:
            query = query.filter(RFIDCard.status == status)
        total = query.count()
        items = query.order_by(RFIDCard.id.desc()).offset(skip).limit(limit).all()
        return total, items

    def get_all_cards(self):
        return self.db.query(RFIDCard).order_by(RFIDCard.id).all()

    def create(self, card: RFIDCard) -> RFIDCard:
        self.db.add(card)
        self.db.commit()
        self.db.refresh(card)
        return card

    def save(self, card: RFIDCard) -> RFIDCard:
        """Persist changes to an existing card (no add needed — already tracked by session)."""
        self.db.commit()
        self.db.refresh(card)
        return card
