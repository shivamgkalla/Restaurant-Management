from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.category_repo import CategoryRepository
from app.models.category import Category
from app.models.tax_config import TaxConfig


class CategoryService:
    def __init__(self, db: Session):
        self.repo = CategoryRepository(db)
        self.db = db

    def _validate_tax_config(self, tax_config_id: int) -> None:
        # Queries directly instead of going through TaxConfigRepository.
        # That repo's get_by_id skips the active check (needed for billing history),
        # but here we only want to allow active configs to be assigned to categories.
        config = self.db.query(TaxConfig).filter(
            TaxConfig.id == tax_config_id,
            TaxConfig.is_active == True
        ).first()
        if not config:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tax config {tax_config_id} not found or is inactive"
            )

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, category_id: int):
        category = self.repo.get_by_id(category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
        return category

    def create(self, name: str, description: str = None, tax_config_id: int = None):
        if self.repo.get_by_name(name):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Category already exists")
        if tax_config_id is not None:
            self._validate_tax_config(tax_config_id)
        return self.repo.create(Category(name=name, description=description, tax_config_id=tax_config_id))

    def update(self, category_id: int, name: str = None, description: str = None,
               is_active: bool = None, tax_config_id: int = None):
        category = self.get_by_id(category_id)
        if name is not None:
            category.name = name
        if description is not None:
            category.description = description
        if is_active is not None:
            category.is_active = is_active
        if tax_config_id is not None:
            self._validate_tax_config(tax_config_id)
            category.tax_config_id = tax_config_id
        return self.repo.update(category)

    def delete(self, category_id: int):
        category = self.get_by_id(category_id)
        active_items = [i for i in category.items if not i.is_archived]
        if active_items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category has active items. Archive items first."
            )
        self.repo.delete(category)
        return {"message": "Category deleted successfully"}
