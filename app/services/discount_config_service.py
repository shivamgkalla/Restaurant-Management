from sqlalchemy.orm import Session
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.repositories.discount_config_repo import DiscountConfigRepository
from app.models.discount_config import DiscountConfig, DiscountConfigTypeEnum

C = HttpConstants.HttpResponseCodes


class DiscountConfigService:
    def __init__(self, db: Session):
        self.repo = DiscountConfigRepository(db)

    def _get_config(self, config_id: int):
        return self.repo.get_by_id(config_id)

    def get_all(self) -> CustomResponse:
        return CustomResponse(C.OK, "Discount configs fetched successfully", data=self.repo.get_all())

    def get_by_id(self, config_id: int) -> CustomResponse:
        config = self._get_config(config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Discount config not found")
        return CustomResponse(C.OK, "Discount config fetched successfully", data=config)

    def create(self, data: dict) -> CustomResponse:
        if self.repo.get_by_name(data["name"]):
            return CustomResponse(C.CONFLICT, "A discount config with this name already exists")
        config = self.repo.create(DiscountConfig(**data))
        return CustomResponse(C.CREATED, "Discount config created successfully", data=config)

    def update(self, config_id: int, data: dict) -> CustomResponse:
        config = self._get_config(config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Discount config not found")

        if "name" in data and data["name"] != config.name:
            if self.repo.get_by_name(data["name"]):
                return CustomResponse(C.CONFLICT, "A discount config with this name already exists")

        # Merge with saved values before validating — partial updates skip the schema validator
        new_max = data.get("max_value", config.max_value)
        new_threshold = data.get("approval_threshold", config.approval_threshold)

        if new_threshold > new_max:
            return CustomResponse(C.BAD_REQUEST, "approval_threshold cannot exceed max_value")
        if config.discount_type == DiscountConfigTypeEnum.percentage and new_max > 100:
            return CustomResponse(C.BAD_REQUEST, "max_value for a percentage discount cannot exceed 100")

        for field in ["name", "max_value", "approval_threshold", "discount_before_tax", "is_active"]:
            if field in data:
                setattr(config, field, data[field])

        config = self.repo.update(config)
        return CustomResponse(C.OK, "Discount config updated successfully", data=config)

    def delete(self, config_id: int) -> CustomResponse:
        config = self._get_config(config_id)
        if not config:
            return CustomResponse(C.NOT_FOUND, "Discount config not found")
        self.repo.delete(config)
        return CustomResponse(C.OK, "Discount config deleted successfully")
