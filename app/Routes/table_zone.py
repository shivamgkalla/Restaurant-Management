from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import require_admin
from app.schemas.table_zone import ZoneCreate, ZoneUpdate
from app.services.table_zone_service import TableZoneService
from app.utils.pagination.params import PaginationParams, pagination_params

router = APIRouter(prefix="/zones", tags=["Table Zones"])


@router.get("")
def get_all(
    params: PaginationParams = Depends(pagination_params),
    db:     Session          = Depends(get_db),
):
    return TableZoneService(db).get_all(params).to_json()


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