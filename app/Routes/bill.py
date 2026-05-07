from fastapi import APIRouter, Depends, Query
from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import require_admin, require_billing_staff
from app.schemas.bill import BillGenerateRequest, ApplyDiscountRequest
from app.services.bill_service import BillService

router = APIRouter(prefix="/bills", tags=["Billing"])


@router.post("/generate")
def generate_bill(
    data: BillGenerateRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).generate(data.order_id, current_staff.id).to_json()


@router.get("")
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
    return BillService(db).get_all(status_filter=status, order_id=order_id, date_from=date_from, date_to=date_to, skip=skip, limit=limit).to_json()


@router.get("/{bill_id}")
def get_one(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).get_by_id(bill_id).to_json()


@router.get("/{bill_id}/print")
def get_print(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).get_print_data(bill_id).to_json()


@router.post("/{bill_id}/discount")
def apply_discount(
    bill_id: int,
    data: ApplyDiscountRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).apply_discount(bill_id, data, current_staff).to_json()


@router.delete("/{bill_id}/discount")
def remove_discount(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return BillService(db).remove_discount(bill_id).to_json()


@router.delete("/{bill_id}")
def cancel_bill(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return BillService(db).cancel(bill_id, current_staff.id).to_json()
