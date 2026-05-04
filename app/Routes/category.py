from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.category import CategoryCreate, CategoryUpdate
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("")
def get_all(db: Session = Depends(get_db)):
    return CategoryService(db).get_all().to_json()


@router.get("/paginated")
def get_paginated(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None, description="Search by name"),
    db: Session = Depends(get_db),
):
    return CategoryService(db).get_paginated(page, limit, search).to_json()


@router.get("/{category_id}")
def get_one(category_id: int, db: Session = Depends(get_db)):
    return CategoryService(db).get_by_id(category_id).to_json()


@router.post("", status_code=201)
def create(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).create(data.name, data.description, data.tax_config_id).to_json()


@router.put("/{category_id}")
def update(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).update(
        category_id, data.name, data.description, data.is_active, data.tax_config_id
    ).to_json()


@router.delete("/{category_id}")
def delete(
    category_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).delete(category_id).to_json()