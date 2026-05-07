from sqlalchemy.orm import Session
from app.models.kitchen_station import KitchenStation

class KitchenStationRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[KitchenStation]:
        return self.db.query(KitchenStation).filter(
            KitchenStation.is_active == True
        ).order_by(KitchenStation.created_at.desc()).all()

    def get_paginated(self, skip: int = 0, limit: int = 10, search: str = None):
        query = self.db.query(KitchenStation)
        if search:
            query = query.filter(KitchenStation.name.ilike(f"%{search}%"))
        total = query.count()
        data = query.order_by(KitchenStation.created_at.desc()).offset(skip).limit(limit).all()
        return data, total

    def get_by_id(self, station_id: int) -> KitchenStation:
        return self.db.query(KitchenStation).filter(
            KitchenStation.id == station_id
        ).first()

    def get_by_name(self, name: str) -> KitchenStation:
        return self.db.query(KitchenStation).filter(
            KitchenStation.name == name
        ).first()

    def create(self, station: KitchenStation) -> KitchenStation:
        self.db.add(station)
        self.db.commit()
        self.db.refresh(station)
        return station

    def update(self, station: KitchenStation) -> KitchenStation:
        self.db.commit()
        self.db.refresh(station)
        return station

    def delete(self, station: KitchenStation) -> None:
        self.db.delete(station)
        self.db.commit()