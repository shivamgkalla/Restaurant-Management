from sqlalchemy.orm import Session
from app.models.table_zone import TableZone

class TableZoneRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[TableZone]:
        return self.db.query(TableZone).filter(
        TableZone.is_active == True
    ).order_by(TableZone.created_at.desc()).all()
    
    def get_paginated(self, skip: int = 0, limit: int = 10) -> tuple[list[TableZone], int]:
            query = self.db.query(TableZone)
            total = query.count()
            zones = query.order_by(TableZone.created_at.desc()).offset(skip).limit(limit).all()
            return zones, total

    def get_by_id(self, zone_id: int) -> TableZone:
        return self.db.query(TableZone).filter(TableZone.id == zone_id).first()

    def get_by_name(self, name: str) -> TableZone:
        return self.db.query(TableZone).filter(TableZone.name == name).first()

    def create(self, zone: TableZone) -> TableZone:
        self.db.add(zone)
        self.db.commit()
        self.db.refresh(zone)
        return zone

    def update(self, zone: TableZone) -> TableZone:
        self.db.commit()
        self.db.refresh(zone)
        return zone

    def delete(self, zone: TableZone) -> None:
        zone.is_active = False
        self.db.commit()