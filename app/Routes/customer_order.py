from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_customer
from app.schemas.customer_order import CustomerOrderCreateRequest, CustomerOrderItemRequest
from app.services.customer_order_service import CustomerOrderService
from typing import List

router = APIRouter(prefix="/customer", tags=["Customer Self-Order"])


@router.get("/tables")
def get_available_tables(db: Session = Depends(get_db)):
    return CustomerOrderService(db).get_available_tables().to_json()


@router.get("/menu")
def get_menu(db: Session = Depends(get_db)):
    return CustomerOrderService(db).get_menu().to_json()


@router.post("/orders")
def create_order(
    data: CustomerOrderCreateRequest,
    db: Session = Depends(get_db),
    current_customer=Depends(get_current_customer),
):
    return CustomerOrderService(db).create_order(data.model_dump(), current_customer.id).to_json()


@router.get("/orders")
def get_my_orders(
    db: Session = Depends(get_db),
    current_customer=Depends(get_current_customer),
):
    return CustomerOrderService(db).get_my_orders(current_customer.id).to_json()


@router.get("/orders/{order_id}")
def get_my_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_customer=Depends(get_current_customer),
):
    return CustomerOrderService(db).get_my_order(order_id, current_customer.id).to_json()


@router.post("/orders/{order_id}/items")
def add_items(
    order_id: int,
    items: List[CustomerOrderItemRequest],
    db: Session = Depends(get_db),
    current_customer=Depends(get_current_customer),
):
    return CustomerOrderService(db).add_items(order_id, current_customer.id, [i.model_dump() for i in items]).to_json()
