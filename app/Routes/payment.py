from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import require_billing_staff
from app.schemas.payment import AddPaymentRequest, PaymentOut, PaymentRemoveOut
from app.services.payment_service import PaymentService

router = APIRouter(tags=["Payments"])


@router.post("/bills/{bill_id}/payments", response_model=PaymentOut, status_code=201)
def add_payment(
    bill_id: int,
    data: AddPaymentRequest,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return PaymentService(db).add_payment(bill_id, data, current_staff)


@router.get("/bills/{bill_id}/payments", response_model=list[PaymentOut])
def get_payments(
    bill_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return PaymentService(db).get_by_bill(bill_id)


@router.delete("/bills/{bill_id}/payments/{payment_id}", response_model=PaymentRemoveOut)
def remove_payment(
    bill_id: int,
    payment_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_billing_staff),
):
    return PaymentService(db).remove_payment(bill_id, payment_id)
