import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base


class OTPActionEnum(str, enum.Enum):
    edit_order     = "edit_order"
    cancel_order   = "cancel_order"
    apply_discount = "apply_discount"


class OTPVerification(Base):
    __tablename__ = "otp_verifications"

    id           = Column(Integer, primary_key=True, index=True)
    action_type  = Column(Enum(OTPActionEnum), nullable=False)
    reference_id = Column(Integer, nullable=False)          # order_id or bill_id
    otp_code     = Column(String(6), nullable=False)
    is_used      = Column(Boolean, default=False)
    expires_at   = Column(DateTime, nullable=False)
    created_at   = Column(DateTime, server_default=func.now())