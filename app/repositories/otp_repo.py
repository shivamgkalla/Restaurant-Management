from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.otp import OTPVerification, OTPActionEnum


class OTPRepository:
    def __init__(self, db: Session):
        self.db = db

    def invalidate_existing(self, action_type: OTPActionEnum, reference_id: int) -> None:
        """Invalidate all unused OTPs for same action + reference before creating new one."""
        self.db.query(OTPVerification).filter(
            OTPVerification.action_type  == action_type,
            OTPVerification.reference_id == reference_id,
            OTPVerification.is_used      == False,
        ).update({"is_used": True})

    def create(self, otp: OTPVerification) -> OTPVerification:
        self.db.add(otp)
        self.db.commit()
        self.db.refresh(otp)
        return otp

    def delete(self, otp: OTPVerification) -> None:
        self.db.delete(otp)
        self.db.commit()

    def get_valid(
        self,
        action_type: OTPActionEnum,
        reference_id: int,
        otp_code: str,
    ) -> OTPVerification | None:
        """Fetch latest unused OTP matching action + reference + code."""
        return (
            self.db.query(OTPVerification)
            .filter(
                OTPVerification.action_type  == action_type,
                OTPVerification.reference_id == reference_id,
                OTPVerification.otp_code     == otp_code,
                OTPVerification.is_used      == False,
            )
            .order_by(OTPVerification.created_at.desc())
            .first()
        )

    def mark_used(self, otp: OTPVerification) -> None:
        otp.is_used = True
        self.db.commit()