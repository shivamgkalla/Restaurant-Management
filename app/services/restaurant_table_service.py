from sqlalchemy.orm import Session

from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.repositories.table_merge_repo import TableMergeRepository
from app.models.restaurant_table import RestaurantTable, TableStatusEnum
from app.models.table_zone import TableZone
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes
M = HttpConstants.HttpStatusMessages


class RestaurantTableService:
    def __init__(self, db: Session):
        self.db         = db
        self.repo       = RestaurantTableRepository(db)
        self.merge_repo = TableMergeRepository(db)

    def get_all(self, zone_id: int = None, status: str = None) -> CustomResponse:
        tables = self.repo.get_all(zone_id, status)
        return CustomResponse(C.OK, "Tables fetched successfully", data=tables)

    def get_by_id(self, table_id: int) -> CustomResponse:
        table = self.repo.get_by_id(table_id)
        if not table:
            return CustomResponse(C.NOT_FOUND, "Table not found")
        return CustomResponse(C.OK, "Table fetched successfully", data=table)

    def create(self, data: dict) -> CustomResponse:
        if self.repo.get_by_number(data["table_number"]):
            return CustomResponse(C.CONFLICT, "Table number already exists")

        zone_id = data.get("zone_id")
        if not zone_id or zone_id == 0:
            return CustomResponse(C.BAD_REQUEST, "zone_id is required and must be valid")

        zone = self.db.query(TableZone).filter_by(id=zone_id).first()
        if not zone:
            return CustomResponse(C.BAD_REQUEST, f"Zone with id {zone_id} does not exist")

        table = RestaurantTable(
            table_number     = data["table_number"],
            seating_capacity = data["seating_capacity"],
            zone_id          = data.get("zone_id"),
            notes            = data.get("notes"),
            pos_x            = data.get("pos_x", 0.0),
            pos_y            = data.get("pos_y", 0.0),
        )
        table = self.repo.create(table)
        return CustomResponse(C.CREATED, "Table created successfully", data=table)

    def update(self, table_id: int, data) -> CustomResponse:
        table = self.repo.get_by_id(table_id)
        if not table:
            return CustomResponse(C.NOT_FOUND, "Table not found")

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(table, field, value)

        table = self.repo.update(table)
        return CustomResponse(C.OK, "Table updated successfully", data=table)

    def update_status(self, table_id: int, status: TableStatusEnum) -> CustomResponse:
        table = self.repo.get_by_id(table_id)
        if not table:
            return CustomResponse(C.NOT_FOUND, "Table not found")
        table.status = status
        table = self.repo.update(table)
        return CustomResponse(C.OK, "Table status updated successfully", data=table)

    def delete(self, table_id: int) -> CustomResponse:
        table = self.repo.get_by_id(table_id)
        if not table:
            return CustomResponse(C.NOT_FOUND, "Table not found")
        if self.merge_repo.get_active_merge_by_table(table_id):
            return CustomResponse(C.BAD_REQUEST, "Table is merged. Unmerge first.")
        self.repo.delete(table)
        return CustomResponse(C.OK, "Table deleted successfully")

    def search(self, page: int, limit: int, search: str = None) -> CustomResponse:
        skip = (page - 1) * limit
        data, total = self.repo.search(search, skip, limit)
        return CustomResponse(
            C.OK,
            "Tables fetched successfully",
            data=data,
            meta={"total": total, "page": page, "limit": limit},
        )