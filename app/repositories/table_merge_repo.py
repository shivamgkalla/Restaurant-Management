from sqlalchemy.orm import Session
from app.models.table_merge import TableMerge

class TableMergeRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_active_merge_by_table(self, table_id: int) -> TableMerge:
        return self.db.query(TableMerge).filter(
            TableMerge.is_active == True,
            (TableMerge.primary_table_id == table_id) |
            (TableMerge.merged_table_id == table_id)
        ).first()

    def get_by_id(self, merge_id: int) -> TableMerge:
        return self.db.query(TableMerge).filter(
            TableMerge.id == merge_id
        ).first()

    def create(self, merge: TableMerge) -> TableMerge:
        self.db.add(merge)
        self.db.commit()
        self.db.refresh(merge)
        return merge

    def update(self, merge: TableMerge) -> TableMerge:
        self.db.commit()
        self.db.refresh(merge)
        return merge