from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.menu_item import MenuItemCreate, MenuItemUpdate, MenuItemOut
from app.services.menu_item_service import MenuItemService

router = APIRouter(prefix="/items", tags=["Menu Items"])

@router.get("", response_model=list[MenuItemOut])
def get_all(
    category_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    return MenuItemService(db).get_all(category_id)

@router.get("/{item_id}", response_model=MenuItemOut)
def get_one(item_id: int, db: Session = Depends(get_db)):
    return MenuItemService(db).get_by_id(item_id)

@router.post("", response_model=MenuItemOut)
def create(
    data: MenuItemCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return MenuItemService(db).create(data.model_dump())

@router.put("/{item_id}", response_model=MenuItemOut)
def update(
    item_id: int,
    data: MenuItemUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return MenuItemService(db).update(item_id, data.model_dump(exclude_none=True))

@router.patch("/{item_id}/availability", response_model=MenuItemOut)
def toggle_availability(
    item_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff),
):
    return MenuItemService(db).toggle_availability(item_id)

@router.delete("/{item_id}")
def archive(
    item_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return MenuItemService(db).archive(item_id)