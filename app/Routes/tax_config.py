from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.tax_config import TaxConfigCreate, TaxConfigUpdate
from app.services.tax_config_service import TaxConfigService

router = APIRouter(prefix="/tax-configs", tags=["Tax Configuration"])


@router.get("")
def get_all(db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_all().to_json()


# /default must be registered before /{tax_config_id} — otherwise FastAPI matches
# the word "default" as an integer ID and this route never gets hit.
@router.get("/default")
def get_default(db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_default().to_json()


@router.get("/{tax_config_id}")
def get_one(tax_config_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_by_id(tax_config_id).to_json()


@router.post("")
def create(data: TaxConfigCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TaxConfigService(db).create(data.model_dump()).to_json()


@router.put("/{tax_config_id}")
def update(
    tax_config_id: int,
    data: TaxConfigUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    # exclude_none=True so unset fields are not passed — service only updates what was actually sent
    return TaxConfigService(db).update(tax_config_id, data.model_dump(exclude_none=True)).to_json()


@router.delete("/{tax_config_id}")
def delete(tax_config_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TaxConfigService(db).delete(tax_config_id).to_json()
