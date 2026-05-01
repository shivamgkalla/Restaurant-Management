from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import require_admin
from app.schemas.table_zone import ZoneCreate, ZoneUpdate
from app.services.table_zone_service import TableZoneService

router = APIRouter(prefix="/zones", tags=["Table Zones"])


@router.get("")
def get_all(db: Session = Depends(get_db)):
    return TableZoneService(db).get_all().to_json()


@router.get("/paginated")
def get_paginated(
    page:  int = Query(1,  ge=1),       
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return TableZoneService(db).get_paginated(page, limit).to_json()


@router.get("/{zone_id}")
def get_one(zone_id: int, db: Session = Depends(get_db)):
    return TableZoneService(db).get_by_id(zone_id).to_json()


@router.post("", status_code=201)
def create(data: ZoneCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).create(data.name, data.description).to_json()


@router.put("/{zone_id}")
def update(zone_id: int, data: ZoneUpdate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).update(zone_id, data.name, data.description, data.is_active).to_json()


@router.delete("/{zone_id}")
def delete(zone_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return TableZoneService(db).delete(zone_id).to_json()
