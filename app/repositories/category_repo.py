from sqlalchemy.orm import Session
from app.models.category import Category

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Category]:
        return self.db.query(Category).filter(
            Category.is_active == True
        ).order_by(Category.created_at.desc()).all()

    def get_paginated(self, skip: int = 0, limit: int = 10, search: str = None):
        query = self.db.query(Category).filter(Category.is_active == True)
        if search:
            query = query.filter(Category.name.ilike(f"%{search}%"))
        total = query.count()
        data = query.order_by(Category.created_at.desc()).offset(skip).limit(limit).all()
        return data, total

    def get_by_id(self, category_id: int) -> Category:
        return self.db.query(Category).filter(Category.id == category_id).first()

    def get_by_name(self, name: str) -> Category:
        return self.db.query(Category).filter(Category.name == name).first()

    def create(self, category: Category) -> Category:
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def update(self, category: Category) -> Category:
        self.db.commit()
        self.db.refresh(category)
        return category

    def delete(self, category: Category) -> None:
        self.db.delete(category)  # ← hard delete
        self.db.commit()