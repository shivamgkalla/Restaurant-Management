from pydantic import BaseModel
from datetime import datetime

class TableMergeRequest(BaseModel):
    primary_table_id: int
    merged_table_id: int

class TableMergeOut(BaseModel):
    id: int
    primary_table_id: int
    merged_table_id: int
    merged_at: datetime
    is_active: bool

    class Config:
        from_attributes = True