from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.menu_item import MenuItemCreate, MenuItemUpdate
from app.services.menu_item_service import MenuItemService
from app.utils.pagination.params import PaginationParams, pagination_params

router = APIRouter(prefix="/items", tags=["Menu Items"])


@router.get("")
def get_all(
    params:      PaginationParams = Depends(pagination_params),
    category_id: Optional[int]   = Query(None),
    search:      Optional[str]   = Query(None),
    db:          Session          = Depends(get_db),
):
    return MenuItemService(db).get_all(params, category_id=category_id, search=search).to_json()


@router.get("/{item_id}")
def get_one(item_id: int, db: Session = Depends(get_db)):
    return MenuItemService(db).get_by_id(item_id).to_json()


@router.post("", status_code=201)
def create(
    data:          MenuItemCreate = ...,
    db:            Session        = Depends(get_db),
    current_staff                 = Depends(require_admin),
):
    return MenuItemService(db).create(data.model_dump()).to_json()


@router.put("/{item_id}")
def update(
    item_id:       int,
    data:          MenuItemUpdate,
    db:            Session = Depends(get_db),
    current_staff          = Depends(require_admin),
):
    return MenuItemService(db).update(item_id, data.model_dump(exclude_none=True)).to_json()


@router.patch("/{item_id}/availability")
def toggle_availability(
    item_id:       int,
    db:            Session = Depends(get_db),
    current_staff          = Depends(get_current_staff),
):
    return MenuItemService(db).toggle_availability(item_id).to_json()


@router.delete("/{item_id}")
def archive(
    item_id:       int,
    db:            Session = Depends(get_db),
    current_staff          = Depends(require_admin),
):
    return MenuItemService(db).archive(item_id).to_json()