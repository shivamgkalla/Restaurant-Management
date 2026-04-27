from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.kot_repo import KOTRepository

class KOTService:
    def __init__(self, db: Session):
        self.repo = KOTRepository(db)

    def get_by_order(self, order_id: int):
        return self.repo.get_by_order(order_id)

    def get_by_id(self, kot_id: int):
        kot = self.repo.get_by_id(kot_id)
        if not kot:
            raise HTTPException(status_code=404, detail="KOT not found")
        return kot

    def mark_printed(self, kot_id: int):
        kot = self.get_by_id(kot_id)
        kot.is_printed = True
        return self.repo.update(kot)

    def mark_urgent(self, kot_id: int):
        kot = self.get_by_id(kot_id)
        kot.is_urgent = True
        return self.repo.update(kot)