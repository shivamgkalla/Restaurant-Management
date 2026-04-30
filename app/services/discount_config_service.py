from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.discount_config_repo import DiscountConfigRepository
from app.models.discount_config import DiscountConfig, DiscountConfigTypeEnum


class DiscountConfigService:
    def __init__(self, db: Session):
        self.repo = DiscountConfigRepository(db)

    def get_all(self) -> list[DiscountConfig]:
        return self.repo.get_all()

    def get_by_id(self, config_id: int) -> DiscountConfig:
        config = self.repo.get_by_id(config_id)
        if not config:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Discount config not found")
        return config

    def create(self, data: dict) -> DiscountConfig:
        if self.repo.get_by_name(data["name"]):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A discount config with this name already exists")
        return self.repo.create(DiscountConfig(**data))

    def update(self, config_id: int, data: dict) -> DiscountConfig:
        config = self.get_by_id(config_id)

        if "name" in data and data["name"] != config.name:
            if self.repo.get_by_name(data["name"]):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A discount config with this name already exists")

        # Merge with saved values before validating — partial updates skip the schema validator
        new_max = data.get("max_value", config.max_value)
        new_threshold = data.get("approval_threshold", config.approval_threshold)

        if new_threshold > new_max:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="approval_threshold cannot exceed max_value")
        if config.discount_type == DiscountConfigTypeEnum.percentage and new_max > 100:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="max_value for a percentage discount cannot exceed 100")

        for field in ["name", "max_value", "approval_threshold", "discount_before_tax", "is_active"]:
            if field in data:
                setattr(config, field, data[field])

        return self.repo.update(config)

    def delete(self, config_id: int) -> dict:
        config = self.get_by_id(config_id)
        self.repo.delete(config)
        return {"message": "Discount config deleted successfully"}
