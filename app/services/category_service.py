from sqlalchemy.orm import Session
from app.repositories.category_repo import CategoryRepository
from app.models.category import Category
from app.models.menu_item import MenuItem
from app.models.tax_config import TaxConfig
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants

C = HttpConstants.HttpResponseCodes


class CategoryService:
    def __init__(self, db: Session):
        self.repo = CategoryRepository(db)
        self.db = db

    def _get_tax_config(self, tax_config_id: int):
        return self.db.query(TaxConfig).filter(
            TaxConfig.id == tax_config_id,
            TaxConfig.is_active == True
        ).first()

    def get_all(self) -> CustomResponse:
        categories = self.repo.get_all()
        return CustomResponse(C.OK, "Categories fetched successfully", data=categories)

    def get_by_id(self, category_id: int) -> CustomResponse:
        category = self.repo.get_by_id(category_id)
        if not category:
            return CustomResponse(C.NOT_FOUND, "Category not found")
        return CustomResponse(C.OK, "Category fetched successfully", data=category)

    def get_paginated(self, page: int = 1, limit: int = 10, search: str = None) -> CustomResponse:
        skip = (page - 1) * limit
        categories, total = self.repo.get_paginated(skip, limit, search)
        total_pages = (total + limit - 1) // limit
        return CustomResponse(
            C.OK,
            "Categories fetched successfully",
            data=categories,
            meta={
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": total_pages,
                "has_next": page * limit < total,
                "has_prev": page > 1,
            },
        )

    def create(self, name: str, description: str = None, tax_config_id: int = None) -> CustomResponse:
        # Duplicate name check
        if self.repo.get_by_name(name):
            return CustomResponse(C.CONFLICT, "Category with this name already exists")

        # Tax config must exist before creating category
        if tax_config_id is not None:
            if not self._get_tax_config(tax_config_id):
                return CustomResponse(C.NOT_FOUND, f"Tax config with id {tax_config_id} not found or inactive. Create tax config first.")

        category = self.repo.create(Category(
            name=name,
            description=description,
            tax_config_id=tax_config_id
        ))
        return CustomResponse(C.CREATED, "Category created successfully", data=category)

    def update(self, category_id: int, name: str = None, description: str = None,
               is_active: bool = None, tax_config_id: int = None) -> CustomResponse:
        category = self.repo.get_by_id(category_id)
        if not category:
            return CustomResponse(C.NOT_FOUND, "Category not found")

        # Duplicate name check on update
        if name is not None and name != category.name:
            if self.repo.get_by_name(name):
                return CustomResponse(C.CONFLICT, "Category with this name already exists")
            category.name = name

        if description is not None:
            category.description = description
        if is_active is not None:
            category.is_active = is_active

        # Tax config validation on update
        if tax_config_id is not None:
            if not self._get_tax_config(tax_config_id):
                return CustomResponse(C.NOT_FOUND, f"Tax config with id {tax_config_id} not found or inactive.")
            category.tax_config_id = tax_config_id

        category = self.repo.update(category)
        return CustomResponse(C.OK, "Category updated successfully", data=category)

    def delete(self, category_id: int) -> CustomResponse:
        category = self.repo.get_by_id(category_id)
        if not category:
            return CustomResponse(C.NOT_FOUND, "Category not found")

        # Active items check
        active_items = self.db.query(MenuItem).filter(
            MenuItem.category_id == category_id,
            MenuItem.is_archived == False
        ).count()
        if active_items > 0:
            return CustomResponse(C.BAD_REQUEST, "Category has active items. Archive items first.")

        self.repo.delete(category)
        return CustomResponse(C.OK, "Category deleted successfully")