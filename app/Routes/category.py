from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryOut
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=list[CategoryOut])
def get_all(db: Session = Depends(get_db)):
    return CategoryService(db).get_all()


@router.get("/{category_id}", response_model=CategoryOut)
def get_one(category_id: int, db: Session = Depends(get_db)):
    return CategoryService(db).get_by_id(category_id)


@router.post("", response_model=CategoryOut, status_code=201)
def create(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).create(data.name, data.description, data.tax_config_id)


@router.put("/{category_id}", response_model=CategoryOut)
def update(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).update(
        category_id, data.name, data.description, data.is_active, data.tax_config_id
    )


@router.delete("/{category_id}")
def delete(
    category_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(require_admin),
):
    return CategoryService(db).delete(category_id)
