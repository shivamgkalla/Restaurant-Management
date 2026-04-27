from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.dependencies import get_current_staff
from app.schemas.table_transfer import TableTransferRequest, TableTransferOut
from app.services.table_transfer_service import TableTransferService

router = APIRouter(prefix="/tables/transfer", tags=["Table Transfer"])

@router.post("", response_model=TableTransferOut)
def transfer(data: TableTransferRequest, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TableTransferService(db).transfer(
        data.from_table_id,
        data.to_table_id,
        data.reason,
        current_staff.id,
    )

@router.get("/history/{table_id}", response_model=list[TableTransferOut])
def get_history(table_id: int, db: Session = Depends(get_db), current_staff=Depends(get_current_staff)):
    return TableTransferService(db).get_history(table_id)