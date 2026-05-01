from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime
from app.models.restaurant_table import TableStatusEnum
from app.schemas.table_zone import ZoneOut


class TableCreate(BaseModel):
    table_number: str
    seating_capacity: int
    zone_id: int
    notes: Optional[str] = None

    @field_validator("table_number")
    @classmethod
    def table_number_must_not_be_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Table number cannot be blank.")
        return v.strip()

    @field_validator("seating_capacity")
    @classmethod
    def capacity_must_be_positive(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("Seating capacity must be greater than 0.")
        return v


class TableUpdate(BaseModel):
    table_number: Optional[str] = None
    seating_capacity: Optional[int] = None
    zone_id: Optional[int] = None
    notes: Optional[str] = None

    @field_validator("table_number")
    @classmethod
    def table_number_must_not_be_blank(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.strip():
            raise ValueError("Table number cannot be blank.")
        return v.strip() if v else v

    @field_validator("seating_capacity")
    @classmethod
    def capacity_must_be_positive(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and v <= 0:
            raise ValueError("Seating capacity must be greater than 0.")
        return v

    @field_validator("zone_id")
    @classmethod
    def zone_id_must_be_positive(cls, v: Optional[int]) -> Optional[int]:
        if v is not None and v <= 0:
            raise ValueError("zone_id must be a valid positive number.")
        return v


class TableStatusUpdate(BaseModel):
    status: TableStatusEnum


class TableOut(BaseModel):
    id: int
    table_number: str
    seating_capacity: int
    status: TableStatusEnum
    notes: Optional[str] = None
    is_active: bool
    created_at: datetime
    zone: Optional[ZoneOut] = None

    class Config:
        from_attributes = True


class TableSearchRequest(BaseModel):
    page: int = 1
    limit: int = 10
    search: Optional[str] = None