from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff
from app.models.otp import OTPActionEnum
from app.services.otp_service import OTPService

router = APIRouter(prefix="/otp", tags=["OTP"])


class SendOTPRequest(BaseModel):
    action_type:  OTPActionEnum
    reference_id: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "action_type":  "cancel_order",
                "reference_id": 5
            }
        }
    }


@router.post("/send")
def send_otp(
    data: SendOTPRequest,
    db: Session = Depends(get_db),
    _=Depends(get_current_staff),
):
    return OTPService(db).send_otp(data.action_type, data.reference_id).to_json()