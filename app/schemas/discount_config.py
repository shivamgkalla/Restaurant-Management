from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime
from app.models.discount_config import DiscountConfigTypeEnum


class DiscountConfigCreate(BaseModel):
    name: str
    discount_type: DiscountConfigTypeEnum
    max_value: float
    approval_threshold: float
    discount_before_tax: bool = True

    @model_validator(mode="after")
    def validate_values(self):
        if self.max_value <= 0:
            raise ValueError("max_value must be greater than zero")
        if self.approval_threshold < 0:
            raise ValueError("approval_threshold cannot be negative")
        if self.approval_threshold > self.max_value:
            raise ValueError("approval_threshold cannot exceed max_value")
        if self.discount_type == DiscountConfigTypeEnum.percentage and self.max_value > 100:
            raise ValueError("max_value for a percentage discount cannot exceed 100")
        return self


# No validator here — partial updates would fail if only one field is sent.
# The service re-validates the full final state after merging with saved values.
class DiscountConfigUpdate(BaseModel):
    name: Optional[str] = None
    max_value: Optional[float] = None
    approval_threshold: Optional[float] = None
    discount_before_tax: Optional[bool] = None
    is_active: Optional[bool] = None


class DiscountConfigOut(BaseModel):
    id: int
    name: str
    discount_type: DiscountConfigTypeEnum
    max_value: float
    approval_threshold: float
    discount_before_tax: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
