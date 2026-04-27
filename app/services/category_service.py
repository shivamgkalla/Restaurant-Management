from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.category_repo import CategoryRepository
from app.models.category import Category

class CategoryService:
    def __init__(self, db: Session):
        self.repo = CategoryRepository(db)

    def get_all(self):
        return self.repo.get_all()

    def get_by_id(self, category_id: int):
        category = self.repo.get_by_id(category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found"
            )
        return category

    def create(self, name: str, description: str = None):
        if self.repo.get_by_name(name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category already exists"
            )
        category = Category(name=name, description=description)
        return self.repo.create(category)

    def update(self, category_id: int, name: str = None, description: str = None, is_active: bool = None):
        category = self.get_by_id(category_id)
        if name is not None:
            category.name = name
        if description is not None:
            category.description = description
        if is_active is not None:
            category.is_active = is_active
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