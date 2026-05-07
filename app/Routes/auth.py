from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.core.custom_response import CustomResponse
from app.core.dependencies import get_current_staff, require_admin
from app.core.http_constants import HttpConstants
from app.database import get_db
from app.models.user import Staff
from app.schemas import (
    ChangePasswordRequest,
    LoginRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
)
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])

C = HttpConstants.HttpResponseCodes


@router.post("/login", status_code=status.HTTP_200_OK, summary="Staff login - returns access + refresh tokens")
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)):
    return auth_service.login(payload, db, request).to_json()


@router.post("/refresh", status_code=status.HTTP_200_OK, summary="Exchange a refresh token for a new access token (token rotation)")
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    return auth_service.refresh_access_token(payload.refresh_token, db).to_json()


@router.post("/logout", status_code=status.HTTP_200_OK, summary="Logout from current session (revokes this refresh token)")
def logout(
    payload: RefreshTokenRequest,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.logout(current_staff.id, payload.refresh_token, db).to_json()


@router.post("/logout-all", status_code=status.HTTP_200_OK, summary="Logout from ALL devices (revokes every active session)")
def logout_all(
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.logout_all(current_staff.id, db).to_json()


@router.get("/me", status_code=status.HTTP_200_OK, summary="Get the currently authenticated staff profile")
def get_me(current_staff: Staff = Depends(get_current_staff)):
    return CustomResponse(C.OK, "Staff fetched successfully", data=current_staff).to_json()


@router.put("/change-password", status_code=status.HTTP_200_OK, summary="Change own password (requires current password)")
def change_password(
    payload: ChangePasswordRequest,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.change_password(current_staff, payload, db).to_json()


@router.put("/reset-password", status_code=status.HTTP_200_OK, summary="Admin only: reset any staff member's password")
def reset_password(
    payload: ResetPasswordRequest,
    _: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return auth_service.admin_reset_password(payload, db).to_json()


@router.get("/sessions", status_code=status.HTTP_200_OK, summary="List all active sessions for the current staff member")
def list_sessions(
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.get_active_sessions(current_staff.id, db).to_json()


@router.delete("/sessions/{session_id}", status_code=status.HTTP_200_OK, summary="Revoke a specific session")
def revoke_session(
    session_id: int,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.revoke_session(session_id, current_staff.id, db).to_json()