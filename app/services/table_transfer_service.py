from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.table_transfer_repo import TableTransferRepository
from app.repositories.restaurant_table_repo import RestaurantTableRepository
from app.models.table_transfer import TableTransferLog
from app.models.restaurant_table import TableStatusEnum

class TableTransferService:
    def __init__(self, db: Session):
        self.transfer_repo = TableTransferRepository(db)
        self.table_repo = RestaurantTableRepository(db)

    def transfer(self, from_table_id: int, to_table_id: int, reason: str, staff_id: int):
        if from_table_id == to_table_id:
            raise HTTPException(status_code=400, detail="Cannot transfer to same table")

        from_table = self.table_repo.get_by_id(from_table_id)
        to_table = self.table_repo.get_by_id(to_table_id)

        if not from_table or not to_table:
            raise HTTPException(status_code=404, detail="Table not found")

        from_table.status = TableStatusEnum.available
        to_table.status = TableStatusEnum.occupied
        self.table_repo.update(from_table)
        self.table_repo.update(to_table)

        return self.transfer_repo.create(TableTransferLog(
            from_table_id=from_table_id,
            to_table_id=to_table_id,
            reason=reason,
            transferred_by=staff_id,
        ))

    def get_history(self, table_id: int):
        return self.transfer_repo.get_by_table(table_id)