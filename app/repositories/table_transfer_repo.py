from sqlalchemy.orm import Session
from app.models.table_transfer import TableTransferLog

class TableTransferRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, log: TableTransferLog) -> TableTransferLog:
        self.db.add(log)
        self.db.commit()
        self.db.refresh(log)
        return log

    def get_by_table(self, table_id: int) -> list[TableTransferLog]:
        return self.db.query(TableTransferLog).filter(
            (TableTransferLog.from_table_id == table_id) |
            (TableTransferLog.to_table_id == table_id)
        ).all()