from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.repositories.table_merge_repo import TableMergeRepository
from app.models.restaurant_table import RestaurantTable, TableStatusEnum
from app.models.table_zone import TableZone

class RestaurantTableService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = RestaurantTableRepository(db)
        self.merge_repo = TableMergeRepository(db)

    def get_all(self, zone_id: int = None, status: str = None):
        return self.repo.get_all(zone_id, status)

    def get_by_id(self, table_id: int):
        table = self.repo.get_by_id(table_id)
        if not table:
            raise HTTPException(status_code=404, detail="Table not found")
        return table

    def create(self, data: dict):
        if self.repo.get_by_number(data["table_number"]):
            raise HTTPException(status_code=409, detail="Table number already exists")
        
        zone_id = data.get("zone_id")

        if not zone_id or zone_id == 0:
            raise HTTPException(
                status_code=400,
                detail="zone_id is required and must be valid"
            )
        
        zone = self.db.query(TableZone).filter_by(id=zone_id).first()
        if not zone:
            raise HTTPException(
            status_code=400,
            detail=f"Zone with id {zone_id} does not exist"
        )
        
        table = RestaurantTable(
            table_number=data["table_number"],
            seating_capacity=data["seating_capacity"],
            zone_id=data.get("zone_id"),
            notes=data.get("notes"),
            pos_x=data.get("pos_x", 0.0),
            pos_y=data.get("pos_y", 0.0),
        )
        return self.repo.create(table)

    def update(self, table_id: int, data: dict):
        table = self.get_by_id(table_id)
        for field in ["table_number", "seating_capacity", "zone_id", "notes", "pos_x", "pos_y"]:
            if data.get(field) is not None:
                setattr(table, field, data[field])
        return self.repo.update(table)

    def update_status(self, table_id: int, status: TableStatusEnum):
        table = self.get_by_id(table_id)
        table.status = status
        return self.repo.update(table)

    def delete(self, table_id: int):
        table = self.get_by_id(table_id)
        if self.merge_repo.get_active_merge_by_table(table_id):
            raise HTTPException(status_code=400, detail="Table is merged. Unmerge first.")
        self.repo.delete(table)
        return {"message": "Table deleted successfully"}
    
    def search(self, page: int, limit: int, search: str = None):
          skip = (page - 1) * limit
          data, total = self.repo.search(search, skip, limit)
          return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": data
    }
    