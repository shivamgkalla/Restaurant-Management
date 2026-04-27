from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.restaurant_table import TableCreate, TableUpdate, TableStatusUpdate, TableOut
from app.services.restaurant_table_service import RestaurantTableService

router = APIRouter(prefix="/tables", tags=["Tables"])

@router.get("", response_model=list[TableOut])
def get_all(
    zone_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return RestaurantTableService(db).get_all(zone_id, status)

@router.get("/{table_id}", response_model=TableOut)
def get_one(table_id: int, db: Session = Depends(get_db)):
    return RestaurantTableService(db).get_by_id(table_id)

@router.post("", response_model=TableOut)
def create(data: TableCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).create(data.model_dump())

@router.put("/{table_id}", response_model=TableOut)
def update(table_id: int, data: TableUpdate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).update(table_id, data.model_dump(exclude_none=True))

@router.patch("/{table_id}/status", response_model=TableOut)
def update_status(table_id: int, data: TableStatusUpdate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return RestaurantTableService(db).update_status(table_id, data.status)

@router.delete("/{table_id}")
def delete(table_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).delete(table_id)