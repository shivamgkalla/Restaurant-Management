import random
import string
from datetime import datetime, timezone, timedelta

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.models.otp import OTPVerification, OTPActionEnum
from app.repositories.otp_repo import OTPRepository
from app.utils.Email.email import send_otp_email

C = HttpConstants.HttpResponseCodes


class OTPService:
    def __init__(self, db: Session):
        self.repo = OTPRepository(db)

    # ── Generate 6 digit OTP ──────────────────────────────────────────────────

    def _generate_otp(self) -> str:
        return "".join(random.choices(string.digits, k=6))

    # ── Send OTP ──────────────────────────────────────────────────────────────

    def send_otp(self, action_type: OTPActionEnum, reference_id: int) -> CustomResponse:
        # Invalidate any existing unused OTPs for same action + reference
        self.repo.invalidate_existing(action_type, reference_id)

        otp_code   = self._generate_otp()
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)

        otp = OTPVerification(
            action_type  = action_type,
            reference_id = reference_id,
            otp_code     = otp_code,
            is_used      = False,
            expires_at   = expires_at,
        )

        # Send email to admin first — if it fails, don't save OTP
        try:
            send_otp_email(otp_code, action_type.value, reference_id)
        except Exception as e:
            return CustomResponse(C.INTERNAL_SERVER_ERROR, f"Failed to send OTP email: {str(e)}")

        self.repo.create(otp)
        return CustomResponse(C.OK, f"OTP sent to admin email. Valid for {settings.OTP_EXPIRE_MINUTES} minutes.")

    # ── Verify OTP ────────────────────────────────────────────────────────────

    def verify_otp(self, action_type: OTPActionEnum, reference_id: int, otp_code: str) -> bool:
        """
        Returns True if OTP is valid — marks it as used.
        Returns False if invalid/expired/already used.
        Called internally from order_service and bill_service before sensitive actions.
        """
        otp = self.repo.get_valid(action_type, reference_id, otp_code)

        if not otp:
            return False

        # Check expiry
        now        = datetime.now(timezone.utc)
        expires_at = otp.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if now > expires_at:
            self.repo.mark_used(otp)
            return False

        self.repo.mark_used(otp)
        return True