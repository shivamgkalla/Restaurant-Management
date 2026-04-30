from sqlalchemy.orm import Session
from app.models.restaurant_table import RestaurantTable
from app.models.table_zone import TableZone

class RestaurantTableRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, zone_id: int = None, status: str = None) -> list[RestaurantTable]:
        query = self.db.query(RestaurantTable).join(
            TableZone, RestaurantTable.zone_id == TableZone.id
        ).filter(
            RestaurantTable.is_active == True,
            TableZone.is_active == True 
        )
        if zone_id:
            query = query.filter(RestaurantTable.zone_id == zone_id)
        if status:
            query = query.filter(RestaurantTable.status == status)
        return query.order_by(RestaurantTable.created_at.desc()).all()

    def get_by_id(self, table_id: int) -> RestaurantTable:
        return self.db.query(RestaurantTable).filter(
            RestaurantTable.id == table_id,
            RestaurantTable.is_active == True
        ).first()

    def get_by_number(self, table_number: str) -> RestaurantTable:
        return self.db.query(RestaurantTable).filter(
            RestaurantTable.table_number == table_number
        ).first()

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

    def search(self, search: str = None, skip: int = 0, limit: int = 10):
        query = self.db.query(RestaurantTable).join(
            TableZone, RestaurantTable.zone_id == TableZone.id
        ).filter(
            RestaurantTable.is_active == True,
            TableZone.is_active == True  
        )
        if search:
            query = query.filter(RestaurantTable.table_number.ilike(f"%{search}%"))
        total = query.count()
        data = query.order_by(RestaurantTable.created_at.desc()).offset(skip).limit(limit).all()
        return data, total