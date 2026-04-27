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
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    return OrderService(db).get_all(captain_id, status, table_id)

@router.get("/{order_id}", response_model=OrderOut)
def get_one(order_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderService(db).get_by_id(order_id)

@router.post("", response_model=OrderOut)
def create(data: OrderCreate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderService(db).create(data.model_dump(), current_staff.id)

@router.patch("/{order_id}/status", response_model=OrderOut)
def update_status(order_id: int, data: OrderStatusUpdate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderService(db).update_status(order_id, data.status)

@router.delete("/{order_id}")
def cancel(order_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return OrderService(db).cancel(order_id)