from sqlalchemy.orm import Session

from app.models.table_zone import TableZone
from app.utils.pagination.paginate import paginate
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


class TableZoneRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, params: PaginationParams) -> PagedResult:
        query = self.db.query(TableZone).order_by(TableZone.created_at.desc())
        return paginate(query, params)

    def get_by_id(self, zone_id: int) -> TableZone:
        return self.db.query(TableZone).filter(TableZone.id == zone_id).first()

    def get_by_name(self, name: str) -> TableZone:
        return self.db.query(TableZone).filter(TableZone.name == name).first()

    def create(self, zone: TableZone) -> TableZone:
        self.db.add(zone)
        self.db.commit()
        self.db.refresh(zone)
        return zone

    def update(self, zone: TableZone) -> TableZone:
        self.db.commit()
        self.db.refresh(zone)
        return zone

    def delete(self, zone: TableZone) -> None:
        self.db.delete(zone)
        self.db.commit()