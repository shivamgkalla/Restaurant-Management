from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.tax_config import TaxConfigCreate, TaxConfigUpdate, TaxConfigOut
from app.services.tax_config_service import TaxConfigService

router = APIRouter(prefix="/tax-configs", tags=["Tax Configuration"])


@router.get("", response_model=list[TaxConfigOut])
def get_all(db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_all()


@router.get("/default", response_model=TaxConfigOut)
def get_default(db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_default()


@router.get("/{tax_config_id}", response_model=TaxConfigOut)
def get_one(tax_config_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TaxConfigService(db).get_by_id(tax_config_id)


@router.post("", response_model=TaxConfigOut, status_code=201)
def create(data: TaxConfigCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TaxConfigService(db).create(data.model_dump())


@router.put("/{tax_config_id}", response_model=TaxConfigOut)
def update(
    tax_config_id: int,
    data: TaxConfigUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return TaxConfigService(db).update(tax_config_id, data.model_dump(exclude_none=True))


@router.delete("/{tax_config_id}")
def delete(tax_config_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TaxConfigService(db).delete(tax_config_id)
