from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.kitchen_station import KitchenStationCreate, KitchenStationUpdate
from app.services.kitchen_station_service import KitchenStationService

router = APIRouter(prefix="/kitchen-stations", tags=["Kitchen Stations"])


@router.get("")
def get_all(db: Session = Depends(get_db)):
    return KitchenStationService(db).get_all().to_json()


@router.get("/paginated")
def get_paginated(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None, description="Search by name"),
    db: Session = Depends(get_db),
):
    return KitchenStationService(db).get_paginated(page, limit, search).to_json()


@router.get("/{station_id}")
def get_one(station_id: int, db: Session = Depends(get_db)):
    return KitchenStationService(db).get_by_id(station_id).to_json()


@router.post("", status_code=201)
def create(
    data: KitchenStationCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return KitchenStationService(db).create(data.name, data.printer_ip).to_json()


@router.put("/{station_id}")
def update(
    station_id: int,
    data: KitchenStationUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return KitchenStationService(db).update(
        station_id, data.model_dump(exclude_none=True)
    ).to_json()


@router.patch("/{station_id}/toggle-availability")
def toggle_availability(
    station_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    return KitchenStationService(db).toggle_availability(station_id).to_json()


@router.delete("/{station_id}")
def delete(
    station_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return KitchenStationService(db).delete(station_id).to_json()