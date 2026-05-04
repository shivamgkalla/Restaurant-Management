from typing import Optional

from sqlalchemy.orm import Session, joinedload

from app.models.restaurant_table import RestaurantTable
from app.models.table_zone import TableZone
from app.utils.pagination.paginate import paginate
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


class RestaurantTableRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        params:  PaginationParams,
        search:  Optional[str] = None,
    ) -> PagedResult:
        query = (
            self.db.query(RestaurantTable)
            .options(joinedload(RestaurantTable.zone))
            .join(TableZone, RestaurantTable.zone_id == TableZone.id)
            .filter(
                RestaurantTable.is_active == True,
                TableZone.is_active       == True,
            )
        )
        if search:
            query = query.filter(RestaurantTable.table_number.ilike(f"%{search}%"))

        query = query.order_by(RestaurantTable.created_at.desc())
        return paginate(query, params)

    def get_by_id(self, table_id: int) -> Optional[RestaurantTable]:
        return (
            self.db.query(RestaurantTable)
            .options(joinedload(RestaurantTable.zone))
            .filter(RestaurantTable.id == table_id, RestaurantTable.is_active == True)
            .first()
        )

    def get_by_number(self, table_number: str) -> Optional[RestaurantTable]:
        return (
            self.db.query(RestaurantTable)
            .filter(RestaurantTable.table_number == table_number)
            .first()
        )

    def create(self, table: RestaurantTable) -> RestaurantTable:
        self.db.add(table)
        self.db.commit()
        self.db.refresh(table)
        return table

    def update(self, table: RestaurantTable) -> RestaurantTable:
        self.db.commit()
        self.db.refresh(table)
        return table

    def delete(self, table: RestaurantTable) -> None:
        table.is_active = False
        self.db.commit()