from sqlalchemy.orm import Session
from app.repositories.kitchen_station_repo import KitchenStationRepository
from app.models.kitchen_station import KitchenStation
from app.models.kot import KOT
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes


class KitchenStationService:
    def __init__(self, db: Session):
        self.repo = KitchenStationRepository(db)
        self.db = db

    def get_all(self) -> CustomResponse:
        stations = self.repo.get_all()
        return CustomResponse(C.OK, "Kitchen stations fetched successfully", data=stations)

    def get_paginated(self, page: int = 1, limit: int = 10, search: str = None) -> CustomResponse:
        skip = (page - 1) * limit
        stations, total = self.repo.get_paginated(skip, limit, search)
        total_pages = (total + limit - 1) // limit
        return CustomResponse(
            C.OK,
            "Kitchen stations fetched successfully",
            data=stations,
            meta={
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": total_pages,
                "has_next": page * limit < total,
                "has_prev": page > 1,
            },
        )

    def get_by_id(self, station_id: int) -> CustomResponse:
        station = self.repo.get_by_id(station_id)
        if not station:
            return CustomResponse(C.NOT_FOUND, "Kitchen station not found")
        return CustomResponse(C.OK, "Kitchen station fetched successfully", data=station)

    def create(self, name: str, printer_ip: str = None) -> CustomResponse:
        if self.repo.get_by_name(name):
            return CustomResponse(C.CONFLICT, "Kitchen station with this name already exists")
        station = self.repo.create(KitchenStation(name=name, printer_ip=printer_ip))
        return CustomResponse(C.CREATED, "Kitchen station created successfully", data=station)

    def update(self, station_id: int, data: dict) -> CustomResponse:
        station = self.repo.get_by_id(station_id)
        if not station:
            return CustomResponse(C.NOT_FOUND, "Kitchen station not found")
        if "name" in data and data["name"] != station.name:
            if self.repo.get_by_name(data["name"]):
                return CustomResponse(C.CONFLICT, "Kitchen station with this name already exists")
        for field in ["name", "printer_ip", "is_active"]:
            if field in data and data[field] is not None:
                setattr(station, field, data[field])
        station = self.repo.update(station)
        return CustomResponse(C.OK, "Kitchen station updated successfully", data=station)

    def toggle_availability(self, station_id: int) -> CustomResponse:
        station = self.repo.get_by_id(station_id)
        if not station:
            return CustomResponse(C.NOT_FOUND, "Kitchen station not found")
        station.is_active = not station.is_active
        self.repo.update(station)
        status = "activated" if station.is_active else "deactivated"
        return CustomResponse(C.OK, f"Kitchen station {status} successfully", data=station)

    def delete(self, station_id: int) -> CustomResponse:
        station = self.repo.get_by_id(station_id)
        if not station:
            return CustomResponse(C.NOT_FOUND, "Kitchen station not found")
        kots = self.db.query(KOT).filter(KOT.station_id == station_id).count()
        if kots > 0:
            return CustomResponse(C.BAD_REQUEST, "Station has KOT slips. Reassign or clear them first.")
        self.repo.delete(station)
        return CustomResponse(C.OK, "Kitchen station deleted successfully")