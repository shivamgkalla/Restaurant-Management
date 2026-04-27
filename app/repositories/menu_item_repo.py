from sqlalchemy.orm import Session
from app.models.menu_item import MenuItem, ItemVariant

class MenuItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, category_id: int = None) -> list[MenuItem]:
        query = self.db.query(MenuItem).filter(MenuItem.is_archived == False)
        if category_id:
            query = query.filter(MenuItem.category_id == category_id)
        return query.all()

    def get_by_id(self, item_id: int) -> MenuItem:
        return self.db.query(MenuItem).filter(
            MenuItem.id == item_id,
            MenuItem.is_archived == False
        ).first()

    def get_by_sku(self, sku: str) -> MenuItem:
        return self.db.query(MenuItem).filter(
            MenuItem.sku == sku
        ).first()

    def create(self, item: MenuItem) -> MenuItem:
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def update(self, item: MenuItem) -> MenuItem:
        self.db.commit()
        self.db.refresh(item)
        return item

    def archive(self, item: MenuItem) -> None:
        item.is_archived = True
        self.db.commit()

class VariantRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, variant_id: int) -> ItemVariant:
        return self.db.query(ItemVariant).filter(
            ItemVariant.id == variant_id
        ).first()

    def get_by_item(self, item_id: int) -> list[ItemVariant]:
        return self.db.query(ItemVariant).filter(
            ItemVariant.item_id == item_id
        ).all()

    def create(self, variant: ItemVariant) -> ItemVariant:
        self.db.add(variant)
        self.db.commit()
        self.db.refresh(variant)
        return variant

    def delete(self, variant: ItemVariant) -> None:
        self.db.delete(variant)
        self.db.commit()