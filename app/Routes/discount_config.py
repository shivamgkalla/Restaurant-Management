from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import require_admin, require_billing_staff
from app.schemas.discount_config import DiscountConfigCreate, DiscountConfigUpdate
from app.services.discount_config_service import DiscountConfigService

router = APIRouter(prefix="/discount-configs", tags=["Discount Configuration"])


# Cashiers and managers need to list configs to pick one when applying a discount to a bill
@router.get("")
def get_all(db: Session = Depends(get_db), current_staff=Depends(require_billing_staff)):
    return DiscountConfigService(db).get_all().to_json()


@router.get("/{config_id}")
def get_one(config_id: int, db: Session = Depends(get_db), current_staff=Depends(require_billing_staff)):
    return DiscountConfigService(db).get_by_id(config_id).to_json()


@router.post("")
def create(data: DiscountConfigCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return DiscountConfigService(db).create(data.model_dump()).to_json()


@router.put("/{config_id}")
def update(
    config_id: int,
    data: DiscountConfigUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    # exclude_none=True so unset fields are not passed — service only updates what was actually sent
    return DiscountConfigService(db).update(config_id, data.model_dump(exclude_none=True)).to_json()


@router.delete("/{config_id}")
def delete(config_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return DiscountConfigService(db).delete(config_id).to_json()
