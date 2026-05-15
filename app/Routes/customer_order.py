from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_customer
from app.schemas.customer_order import CustomerOrderCreateRequest, CustomerOrderItemRequest
from app.services.customer_order_service import CustomerOrderService
from app.services.category_service import CategoryService
from app.services.menu_item_service import MenuItemService
from app.utils.pagination.params import PaginationParams, pagination_params

router = APIRouter(prefix="/customer", tags=["Customer Self-Order"])


@router.get("/tables")
def get_available_tables(db: Session = Depends(get_db)):
    return CustomerOrderService(db).get_available_tables().to_json()


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    """Same behaviour as `GET /categories` (active categories only)."""
    return CategoryService(db).get_all().to_json()


@router.get("/items")
def get_menu_items(
    params: PaginationParams = Depends(pagination_params),
    category_id: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """Same behaviour as `GET /items` (pagination, optional category_id and search)."""
    return MenuItemService(db).get_all(params, category_id=category_id, search=search).to_json()


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
