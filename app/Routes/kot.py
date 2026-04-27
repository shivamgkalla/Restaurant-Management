from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff
from app.schemas.kot import KOTOut
from app.services.kot_service import KOTService

router = APIRouter(prefix="/kot", tags=["KOT"])

@router.get("/order/{order_id}", response_model=list[KOTOut])
def get_by_order(order_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return KOTService(db).get_by_order(order_id)

@router.get("/{kot_id}", response_model=KOTOut)
def get_one(kot_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return KOTService(db).get_by_id(kot_id)

@router.patch("/{kot_id}/printed", response_model=KOTOut)
def mark_printed(kot_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return KOTService(db).mark_printed(kot_id)

@router.patch("/{kot_id}/urgent", response_model=KOTOut)
def mark_urgent(kot_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return KOTService(db).mark_urgent(kot_id)