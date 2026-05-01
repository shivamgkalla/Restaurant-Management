from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_staff, require_admin
from app.database import get_db
from app.schemas.customer import CustomerCreateRequest, CustomerUpdateRequest
from app.services.customer_service import CustomerService

router = APIRouter(prefix="/customers", tags=["Customers"])


def get_service(db: Session = Depends(get_db)) -> CustomerService:
    return CustomerService(db)


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("")
def list_customers(
    page:          int            = Query(default=1,    ge=1),
    limit:         int            = Query(default=10,   ge=1, le=200),
    customer_type: Optional[str]  = Query(default=None, description="new | regular | vip"),
    search:        Optional[str]  = Query(default=None, description="Search by name, phone, or CUST-ID"),
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    return service.get_all_customers(page=page, limit=limit, customer_type=customer_type, search=search).to_json()


@router.get("/phone/{phone}")
def get_by_phone(
    phone: str,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    return service.search_by_phone(phone).to_json()


@router.get("/{id}")
def get_customer(
    id: int,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    return service.get_customer_by_id(id).to_json()


@router.post("", status_code=201)
def create_customer(
    payload: CustomerCreateRequest,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    return service.create_customer(payload).to_json()


@router.put("/{id}")
def update_customer(
    id: int,
    payload: CustomerUpdateRequest,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(require_admin),
):
    return service.update_customer(id, payload).to_json()


@router.patch("/{id}/status")
def toggle_customer_status(
    id: int,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(require_admin),
):
    return service.toggle_status(id).to_json()

@router.delete("/{id}", status_code=200)
def delete_customer(
    id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    service = CustomerService(db)
    return service.delete_customer(id).to_json()