from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import require_admin
from app.schemas.kitchen_station import KitchenStationCreate, KitchenStationUpdate, KitchenStationOut
from app.services.kitchen_station_service import KitchenStationService

router = APIRouter(prefix="/kitchen-stations", tags=["Kitchen Stations"])

@router.get("", response_model=list[KitchenStationOut])
def get_all(db: Session = Depends(get_db)):
    return KitchenStationService(db).get_all()

@router.get("/{station_id}", response_model=KitchenStationOut)
def get_one(station_id: int, db: Session = Depends(get_db)):
    return KitchenStationService(db).get_by_id(station_id)

@router.post("", response_model=KitchenStationOut)
def create(data: KitchenStationCreate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return KitchenStationService(db).create(data.name, data.printer_ip, data.printer_name)

@router.put("/{station_id}", response_model=KitchenStationOut)
def update(station_id: int, data: KitchenStationUpdate, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return KitchenStationService(db).update(station_id, data.model_dump(exclude_none=True))

@router.delete("/{station_id}")
def delete(station_id: int, db: Session = Depends(get_db), current_staff=Depends(require_admin)):
    return KitchenStationService(db).delete(station_id)