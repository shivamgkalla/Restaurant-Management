from sqlalchemy.orm import Session

from app.repositories.table_zone_repo import TableZoneRepository
from app.models.table_zone import TableZone
from app.models.restaurant_table import RestaurantTable
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes
M = HttpConstants.HttpStatusMessages


class TableZoneService:
    def __init__(self, db: Session):
        self.repo = TableZoneRepository(db)
        self.db   = db

    def get_all(self) -> CustomResponse:
        zones = self.repo.get_all()
        return CustomResponse(C.OK, "Zones fetched successfully", data=zones)

    def get_by_id(self, zone_id: int) -> CustomResponse:
        zone = self.repo.get_by_id(zone_id)
        if not zone:
            return CustomResponse(C.NOT_FOUND, "Zone not found")
        return CustomResponse(C.OK, "Zone fetched successfully", data=zone)

    def get_paginated(self, page: int = 1, limit: int = 10) -> CustomResponse:
        skip        = (page - 1) * limit
        zones, total = self.repo.get_paginated(skip, limit)
        total_pages = (total + limit - 1) // limit  # ceil division

        return CustomResponse(
            C.OK,
            "Zones fetched successfully",
            data=zones,
            meta={
                "total":       total,
                "page":        page,
                "limit":       limit,
                "total_pages": total_pages,
            },
        )

    def create(self, name: str, description: str = None) -> CustomResponse:
        if self.repo.get_by_name(name):
            return CustomResponse(C.CONFLICT, "Zone with this name already exists")
        zone = self.repo.create(TableZone(name=name, description=description))
        return CustomResponse(C.CREATED, "Zone created successfully", data=zone)

    def update(self, zone_id: int, name: str = None, description: str = None, is_active: bool = None) -> CustomResponse:
        zone = self.repo.get_by_id(zone_id)
        if not zone:
            return CustomResponse(C.NOT_FOUND, "Zone not found")
        if name        is not None: zone.name        = name
        if description is not None: zone.description = description
        if is_active   is not None: zone.is_active   = is_active
        zone = self.repo.update(zone)
        return CustomResponse(C.OK, "Zone updated successfully", data=zone)

    def delete(self, zone_id: int) -> CustomResponse:
        zone = self.repo.get_by_id(zone_id)
        if not zone:
            return CustomResponse(C.NOT_FOUND, "Zone not found")
        active_tables = self.db.query(RestaurantTable).filter(
            RestaurantTable.zone_id   == zone_id,
            RestaurantTable.is_active == True,
        ).count()
        if active_tables > 0:
            return CustomResponse(C.BAD_REQUEST, "Zone has active tables. Reassign them first.")
        self.repo.delete(zone)
        return CustomResponse(C.OK, "Zone deleted successfully")