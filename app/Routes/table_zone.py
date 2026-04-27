from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import require_admin
from app.schemas.table_zone import ZoneCreate, ZoneUpdate, ZoneOut
from app.services.table_zone_service import TableZoneService

router = APIRouter(prefix="/zones", tags=["Table Zones"])

@router.get("", response_model=list[ZoneOut])
def get_all(db: Session = Depends(get_db)):
    return TableZoneService(db).get_all()

@router.get("/{zone_id}", response_model=ZoneOut)
def get_one(zone_id: int, db: Session = Depends(get_db)):
    return TableZoneService(db).get_by_id(zone_id)

@router.post("", response_model=ZoneOut)
def create(data: ZoneCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).create(data.name, data.description)

@router.put("/{zone_id}", response_model=ZoneOut)
def update(zone_id: int, data: ZoneUpdate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).update(zone_id, data.name, data.description, data.is_active)

@router.delete("/{zone_id}")
def delete(zone_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).delete(zone_id)