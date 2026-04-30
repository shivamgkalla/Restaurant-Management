from fastapi import APIRouter, Depends, Query
from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin, require_billing_staff
from app.schemas.bill import BillOut, BillPrintOut, BillGenerateRequest, ApplyDiscountRequest
from app.services.bill_service import BillService

router = APIRouter(prefix="/bills", tags=["Billing"])


@router.post("/generate", response_model=BillOut, status_code=201)
def generate_bill(
    data: BillGenerateRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).generate(data.order_id, current_staff.id)


@router.get("", response_model=list[BillOut])
def get_all(
    status: Optional[str] = Query(None),
    order_id: Optional[int] = Query(None),
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).get_all(status, order_id, date_from, date_to, skip, limit)


@router.get("/{bill_id}", response_model=BillOut)
def get_one(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).get_by_id(bill_id)


@router.get("/{bill_id}/print", response_model=BillPrintOut)
def get_print(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).get_print_data(bill_id)


@router.post("/{bill_id}/discount", response_model=BillOut)
def apply_discount(
    bill_id: int,
    data: ApplyDiscountRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).apply_discount(bill_id, data, current_staff)


@router.delete("/{bill_id}/discount", response_model=BillOut)
def remove_discount(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).remove_discount(bill_id)


@router.delete("/{bill_id}", response_model=BillOut)
def cancel_bill(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return BillService(db).cancel(bill_id, current_staff.id)
