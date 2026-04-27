from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TableTransferRequest(BaseModel):
    from_table_id: int
    to_table_id: int
    reason: Optional[str] = None

class TableTransferOut(BaseModel):
    id: int
    from_table_id: int
    to_table_id: int
    reason: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True