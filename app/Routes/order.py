from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.order import OrderCreate, OrderOut, OrderStatusUpdate
from app.services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("", response_model=list[OrderOut])
def get_all(
    captain_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    table_id: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    return OrderService(db).get_all(captain_id, status, table_id, skip, limit)

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