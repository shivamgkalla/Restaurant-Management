"""
Base Pydantic schema with ORM mode enabled.
All response schemas should inherit from this.
"""
from pydantic import BaseModel


class BaseResponse(BaseModel):
    model_config = {"from_attributes": True}
