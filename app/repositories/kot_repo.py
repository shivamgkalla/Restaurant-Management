from sqlalchemy.orm import Session
from app.models.kot import KOT

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