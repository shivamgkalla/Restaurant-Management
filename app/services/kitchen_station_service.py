from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.kitchen_station_repo import KitchenStationRepository
from app.models.kitchen_station import KitchenStation

class KitchenStationService:
    def __init__(self, db: Session):
        self.repo = KitchenStationRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, station_id: int):
        station = self.repo.get_by_id(station_id)
        if not station:
            raise HTTPException(status_code=404, detail="Kitchen station not found")
        return station

    def create(self, name: str, printer_ip: str = None, printer_name: str = None):
        if self.repo.get_by_name(name):
            raise HTTPException(status_code=400, detail="Station already exists")
        return self.repo.create(KitchenStation(
            name=name,
            printer_ip=printer_ip,
            printer_name=printer_name,
        ))

    def update(self, station_id: int, data: dict):
        station = self.get_by_id(station_id)
        for field in ["name", "printer_ip", "printer_name", "is_active"]:
            if data.get(field) is not None:
                setattr(station, field, data[field])
        return self.repo.update(station)

    def delete(self, station_id: int):
        station = self.get_by_id(station_id)
        self.repo.delete(station)
        return {"message": "Kitchen station deleted successfully"}