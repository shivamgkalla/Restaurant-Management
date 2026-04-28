from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.repositories.table_merge_repo import TableMergeRepository
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.models.table_merge import TableMerge
from app.models.restaurant_table import TableStatusEnum

class TableMergeService:
    def __init__(self, db: Session):
        self.merge_repo = TableMergeRepository(db)
        self.table_repo = RestaurantTableRepository(db)

    def merge(self, primary_table_id: int, merged_table_id: int):
        if primary_table_id == merged_table_id:
            raise HTTPException(status_code=400, detail="Cannot merge table with itself")
        primary = self.table_repo.get_by_id(primary_table_id)
        merged = self.table_repo.get_by_id(merged_table_id)
        if not primary or not merged:
            raise HTTPException(status_code=404, detail="Table not found")
        if self.merge_repo.get_active_merge_by_table(primary_table_id):
            raise HTTPException(status_code=400, detail="Primary table already merged")
        if self.merge_repo.get_active_merge_by_table(merged_table_id):
            raise HTTPException(status_code=400, detail="Secondary table already merged")
        primary.status = TableStatusEnum.occupied
        merged.status = TableStatusEnum.occupied
        self.table_repo.update(primary)
        self.table_repo.update(merged)
        return self.merge_repo.create(TableMerge(
            primary_table_id=primary_table_id,
            merged_table_id=merged_table_id,
        ))

    def unmerge(self, merge_id: int):
        merge = self.merge_repo.get_by_id(merge_id)
        if not merge or not merge.is_active:
            raise HTTPException(status_code=404, detail="Active merge not found")
        merge.is_active = False
        merge.unmerged_at = datetime.now(timezone.utc)
        primary = self.table_repo.get_by_id(merge.primary_table_id)
        merged = self.table_repo.get_by_id(merge.merged_table_id)
        primary.status = TableStatusEnum.available
        merged.status = TableStatusEnum.available
        self.table_repo.update(primary)
        self.table_repo.update(merged)
        self.merge_repo.update(merge)
        return {"message": "Tables unmerged successfully"}