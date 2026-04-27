from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff
from app.schemas.table_merge import TableMergeRequest, TableMergeOut
from app.services.table_merge_service import TableMergeService

router = APIRouter(prefix="/tables/merge", tags=["Table Merge"])

@router.post("", response_model=TableMergeOut)
def merge(data: TableMergeRequest, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TableMergeService(db).merge(data.primary_table_id, data.merged_table_id)

@router.patch("/unmerge/{merge_id}")
def unmerge(merge_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TableMergeService(db).unmerge(merge_id)