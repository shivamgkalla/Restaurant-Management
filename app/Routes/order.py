from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.order import OrderCreate, OrderOut, OrderStatusUpdate
from app.services.order_service import OrderService
from app.utils.pagination.params import PaginationParams, pagination_params

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("")
def get_all(
    params: PaginationParams = Depends(pagination_params),
    search: Optional[str]   = Query(None, description="Search by order number"),
    db:     Session          = Depends(get_db),
    current_staff            = Depends(get_current_staff),
):
    return OrderService(db).get_all(params, search=search).to_json()


@router.get("/{order_id}", response_model=OrderOut)
def get_one(order_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderService(db).get_by_id(order_id)


@router.post("", response_model=OrderOut)
def create(data: OrderCreate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderService(db).create(data.model_dump(), current_staff.id)


@router.patch("/{order_id}/status", response_model=OrderOut)
def update_status(
    order_id: int,
    data: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    return OrderService(db).update_status(order_id, data.status, current_staff.role.name)


@router.delete("/{order_id}")
def cancel(order_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return OrderService(db).cancel(order_id)