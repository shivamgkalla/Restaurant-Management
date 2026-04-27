from datetime import datetime, timedelta, timezone
from hashlib import sha256
from typing import Optional

from fastapi import HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import verify_password, hash_password, create_access_token, create_refresh_token, decode_token
from app.models.user import Staff, StaffSession
from app.repositories.staff_repository import staff_repo
from app.schemas.auth.requests import ChangePasswordRequest, LoginRequest, ResetPasswordRequest


def _hash_token(token: str) -> str:
    """Store only the SHA-256 hash of refresh tokens, never the raw value."""
    return sha256(token.encode()).hexdigest()


def _build_token_pair(staff: Staff) -> tuple[str, str]:
    """Create a fresh (access_token, refresh_token) pair for a staff member."""
    payload = {"sub": str(staff.id), "role": staff.role.name}
    return create_access_token(payload), create_refresh_token(payload)


def login(payload: LoginRequest, db: Session, request: Optional[Request] = None) -> dict:
    staff = staff_repo.get_by_username(db, payload.username)

    # Same error for "not found" and "wrong password" — prevents user enumeration
    if not staff or not verify_password(payload.password, staff.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    if not staff.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivated. Contact admin.",
        )

    access_token, refresh_token = _build_token_pair(staff)

    session = StaffSession(
        staff_id=staff.id,
        refresh_token_hash=_hash_token(refresh_token),
        device_info=request.headers.get("User-Agent") if request else None,
        ip_address=request.client.host if request and request.client else None,
        is_active=True,
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    staff_repo.create_session(db, session)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "staff": {
            "id": staff.id,
            "employee_id": staff.employee_id,
            "name": staff.name,
            "username": staff.username,
            "role": staff.role.name,
        },
    }


def refresh_access_token(refresh_token: str, db: Session) -> dict:
    payload = decode_token(refresh_token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    staff_id = int(payload["sub"])
    session = staff_repo.get_active_session_by_token_hash(db, staff_id, _hash_token(refresh_token))

    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session not found. Please log in again.",
        )

    # Check expiry (handle naive datetimes from DB)
    expires_at = session.expires_at
    if expires_at is not None:
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at < datetime.now(timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Session expired. Please log in again.",
            )

    staff = staff_repo.get_active_by_id(db, staff_id)
    if not staff:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Staff account not found or deactivated",
        )

    # Token rotation: revoke old session, issue new tokens
    staff_repo.revoke_session(db, session)
    new_access, new_refresh = _build_token_pair(staff)

    new_session = StaffSession(
        staff_id=staff.id,
        refresh_token_hash=_hash_token(new_refresh),
        device_info=session.device_info,
        ip_address=session.ip_address,
        is_active=True,
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    staff_repo.create_session(db, new_session)

    return {
        "access_token": new_access,
        "refresh_token": new_refresh,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }



def logout(staff_id: int, refresh_token: str, db: Session) -> None:
    session = staff_repo.get_active_session_by_token_hash(db, staff_id, _hash_token(refresh_token))
    if session:
        staff_repo.revoke_session(db, session)


def logout_all(staff_id: int, db: Session) -> int:
    return staff_repo.revoke_all_sessions(db, staff_id)



def change_password(staff: Staff, payload: ChangePasswordRequest, db: Session) -> None:
    if not verify_password(payload.current_password, staff.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )
    if payload.current_password == payload.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must differ from current password",
        )
    staff.password_hash = hash_password(payload.new_password)
    # Force re-login on all devices after password change
    staff_repo.revoke_all_sessions(db, staff.id)
    staff_repo.save(db, staff)


def admin_reset_password(payload: ResetPasswordRequest, db: Session) -> None:
    target = staff_repo.get_by_id(db, payload.staff_id)
    if not target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Staff with id {payload.staff_id} not found",
        )
    target.password_hash = hash_password(payload.new_password)
    staff_repo.revoke_all_sessions(db, target.id)
    staff_repo.save(db, target)



def get_active_sessions(staff_id: int, db: Session) -> list[StaffSession]:
    return staff_repo.get_active_sessions(db, staff_id)


def revoke_session(session_id: int, staff_id: int, db: Session) -> None:
    session = staff_repo.get_session_by_id(db, session_id, staff_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found",
        )
    staff_repo.revoke_session(db, session)
