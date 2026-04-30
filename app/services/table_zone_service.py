from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.table_zone_repo import TableZoneRepository
from app.models.table_zone import TableZone
from app.models.restaurant_table import RestaurantTable

class TableZoneService:
    def __init__(self, db: Session):
        self.repo = TableZoneRepository(db)
        self.db = db

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, zone_id: int):
        zone = self.repo.get_by_id(zone_id)
        if not zone:
            raise HTTPException(status_code=404, detail="Zone not found")
        return zone
    
    def get_paginated(self, skip: int = 0, limit: int = 10):
        zones, total = self.repo.get_paginated(skip, limit)
        return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": zones
    }

    def create(self, name: str, description: str = None):
        if self.repo.get_by_name(name):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Zone already exists")
        return self.repo.create(TableZone(name=name, description=description))

    def update(self, zone_id: int, name: str = None, description: str = None, is_active: bool = None):
        zone = self.get_by_id(zone_id)
        if name is not None: zone.name = name
        if description is not None: zone.description = description
        if is_active is not None: zone.is_active = is_active
        return self.repo.update(zone)

    def delete(self, zone_id: int):
        zone = self.get_by_id(zone_id)
        active_tables = self.db.query(RestaurantTable).filter(
            RestaurantTable.zone_id == zone_id,
            RestaurantTable.is_active == True
        ).count()
        if active_tables > 0:
            raise HTTPException(status_code=400, detail="Zone has active tables. Reassign them first.")
        self.repo.delete(zone)
        return {"message": "Zone deleted successfully"}