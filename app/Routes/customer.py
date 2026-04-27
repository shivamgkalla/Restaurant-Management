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

@router.get("", response_model=CustomerListResponse)
def list_customers(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
    customer_type: Optional[str] = Query(default=None, description="new | regular | vip"),
    search: Optional[str] = Query(default=None, description="Search by name, phone, or CUST-ID"),
    service: CustomerService = Depends(get_service),
    _: dict = Depends(get_current_staff),
):
    """List customers. Search works across name, phone, and customer ID."""
    customers, total = service.get_all_customers(
        skip=skip, limit=limit, customer_type=customer_type, search=search
    )
    return CustomerListResponse(total=total, customers=customers)


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