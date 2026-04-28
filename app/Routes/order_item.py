from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin_or_manager
from app.schemas.order_item import OrderItemAdd, OrderItemUpdate, OrderItemOut
from app.services.order_item_service import OrderItemService

router = APIRouter(prefix="/orders", tags=["Order Items"])

@router.get("/{order_id}/items", response_model=list[OrderItemOut])
def get_items(order_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderItemService(db).get_by_order(order_id)

@router.post("/{order_id}/items", response_model=OrderItemOut)
def add_item(order_id: int, data: OrderItemAdd, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderItemService(db).add_item(order_id, data.model_dump())

@router.put("/items/{item_id}", response_model=OrderItemOut)
def update_item(item_id: int, data: OrderItemUpdate, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return OrderItemService(db).update_item(item_id, data.model_dump(exclude_none=True))

@router.delete("/items/{item_id}")
def cancel_item(item_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin_or_manager)):
    return OrderItemService(db).cancel_item(item_id)