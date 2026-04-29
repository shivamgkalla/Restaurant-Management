from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime


class TaxConfigCreate(BaseModel):
    name: str
    total_rate: float
    cgst_rate: float
    sgst_rate: float
    igst_rate: float = 0.0
    is_igst_mode: bool = False
    is_inclusive: bool = False
    is_default: bool = False

    @model_validator(mode="after")
    def validate_rates(self):
        if self.is_igst_mode:
            if round(self.igst_rate, 4) != round(self.total_rate, 4):
                raise ValueError("igst_rate must equal total_rate when is_igst_mode is True")
        else:
            if round(self.cgst_rate + self.sgst_rate, 4) != round(self.total_rate, 4):
                raise ValueError("cgst_rate + sgst_rate must equal total_rate")
        if any(r < 0 for r in [self.total_rate, self.cgst_rate, self.sgst_rate, self.igst_rate]):
            raise ValueError("Tax rates cannot be negative")
        return self


class TaxConfigUpdate(BaseModel):
    name: Optional[str] = None
    total_rate: Optional[float] = None
    cgst_rate: Optional[float] = None
    sgst_rate: Optional[float] = None
    igst_rate: Optional[float] = None
    is_igst_mode: Optional[bool] = None
    is_inclusive: Optional[bool] = None
    is_default: Optional[bool] = None
    is_active: Optional[bool] = None


class TaxConfigOut(BaseModel):
    id: int
    name: str
    total_rate: float
    cgst_rate: float
    sgst_rate: float
    igst_rate: float
    is_igst_mode: bool
    is_inclusive: bool
    is_default: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
