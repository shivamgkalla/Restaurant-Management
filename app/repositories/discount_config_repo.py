from sqlalchemy.orm import Session
from app.models.discount_config import DiscountConfig


class DiscountConfigRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[DiscountConfig]:
        return self.db.query(DiscountConfig).filter(DiscountConfig.is_active == True).all()

    def get_by_id(self, config_id: int) -> DiscountConfig:
        # No active filter — service needs to detect inactive configs and give a clear error
        return self.db.query(DiscountConfig).filter(DiscountConfig.id == config_id).first()

    def get_by_name(self, name: str) -> DiscountConfig:
        return self.db.query(DiscountConfig).filter(DiscountConfig.name == name).first()

    def create(self, config: DiscountConfig) -> DiscountConfig:
        self.db.add(config)
        self.db.commit()
        self.db.refresh(config)
        return config

    def update(self, config: DiscountConfig) -> DiscountConfig:
        self.db.commit()
        self.db.refresh(config)
        return config

    def delete(self, config: DiscountConfig) -> None:
        config.is_active = False
        self.db.commit()
