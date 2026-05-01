from typing import Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_staff, require_admin
from app.database import get_db
from app.schemas.customer import (
    CustomerCreateRequest,
    CustomerListResponse,
    CustomerResponse,
    CustomerUpdateRequest,
)
from app.services.customer_service import CustomerService

router = APIRouter(prefix="/customers", tags=["Customers"])


def get_service(db: Session = Depends(get_db)) -> CustomerService:
    return CustomerService(db)


# ── Endpoints ─────────────────────────────────────────────────────────────────
@router.get("")
def list_customers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=200),
    search: Optional[str] = Query(None, description="Search by name, phone, customer_id or type"),
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    service = CustomerService(db)
    customers, total = service.get_all_customers(page=page, page_size=page_size, search=search)
    
    import math
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": math.ceil(total / page_size),
        "customers": customers
    }
@router.get("/phone/{phone}", response_model=CustomerResponse)
def get_by_phone(
    phone: str,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    """Quick POS lookup by phone number."""
    return service.search_by_phone(phone)


@router.get("/{id}", response_model=CustomerResponse)
def get_customer(
    id: int,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    """Get full customer profile by ID."""
    return service.get_customer_by_id(id)


@router.post("", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
def create_customer(
    payload: CustomerCreateRequest,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    """Register a new customer."""
    return service.create_customer(payload)


@router.put("/{id}", response_model=CustomerResponse)
def update_customer(
    id: int,
    payload: CustomerUpdateRequest,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(require_admin),
):
    """Edit customer profile. Partial update — only send fields you want to change."""
    return service.update_customer(id, payload)


@router.patch("/{id}/status", response_model=CustomerResponse)
def toggle_customer_status(
    id: int,
    service: CustomerService = Depends(get_service),
    _: dict = Depends(require_admin),
):
    """
    Toggle customer active/inactive status.
    - Active   → becomes Inactive (deactivated)
    - Inactive → becomes Active   (reactivated)
    """
    return service.toggle_status(id)