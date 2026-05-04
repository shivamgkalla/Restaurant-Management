from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.restaurant_table import TableCreate, TableUpdate, TableStatusUpdate
from app.services.restaurant_table_service import RestaurantTableService
from app.utils.pagination.params import PaginationParams, pagination_params

router = APIRouter(prefix="/tables", tags=["Tables"])


@router.get("")
def get_all(
    params:  PaginationParams = Depends(pagination_params),
    search:  Optional[str]    = Query(None),
    db:      Session           = Depends(get_db),
):
    return RestaurantTableService(db).get_all(params,  search=search).to_json()


@router.get("/{table_id}")
def get_one(table_id: int, db: Session = Depends(get_db)):
    return RestaurantTableService(db).get_by_id(table_id).to_json()


@router.post("", status_code=201)
def create(data: TableCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).create(data.model_dump()).to_json()


@router.put("/{table_id}")
def update(table_id: int, data: TableUpdate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).update(table_id, data).to_json()


@router.patch("/{table_id}/status")
def update_status(table_id: int, data: TableStatusUpdate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return RestaurantTableService(db).update_status(table_id, data.status).to_json()


@router.delete("/{table_id}")
def delete(table_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return RestaurantTableService(db).delete(table_id).to_json()