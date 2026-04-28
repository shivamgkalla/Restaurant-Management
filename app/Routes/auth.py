from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin
from app.models.user import Staff
from app.services import auth_service
from app.schemas import (
    LoginRequest,
    RefreshTokenRequest,
    ChangePasswordRequest,
    ResetPasswordRequest,
    LoginResponse,
    TokenRefreshResponse,
    SessionResponse,
    MessageResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK,
             summary="Staff login — returns access + refresh tokens")
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)):
    return auth_service.login(payload, db, request)


@router.post("/refresh", response_model=TokenRefreshResponse, status_code=status.HTTP_200_OK,
             summary="Exchange a refresh token for a new access token (token rotation)")
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    return auth_service.refresh_access_token(payload.refresh_token, db)


@router.post("/logout", response_model=MessageResponse, status_code=status.HTTP_200_OK,
             summary="Logout from current session (revokes this refresh token)")
def logout(
    payload: RefreshTokenRequest,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    auth_service.logout(current_staff.id, payload.refresh_token, db)
    return {"message": "Logged out successfully"}


@router.post("/logout-all", response_model=MessageResponse, status_code=status.HTTP_200_OK,
             summary="Logout from ALL devices (revokes every active session)")
def logout_all(
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    count = auth_service.logout_all(current_staff.id, db)
    return {"message": f"Logged out from {count} session(s) successfully"}


@router.get("/me", status_code=status.HTTP_200_OK,
            summary="Get the currently authenticated staff profile")
def get_me(current_staff: Staff = Depends(get_current_staff)):
    return current_staff


@router.put("/change-password", response_model=MessageResponse, status_code=status.HTTP_200_OK,
            summary="Change own password (requires current password)")
def change_password(
    payload: ChangePasswordRequest,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    auth_service.change_password(current_staff, payload, db)
    return {"message": "Password changed successfully. Please log in again."}


@router.put("/reset-password", response_model=MessageResponse, status_code=status.HTTP_200_OK,
            summary="Admin only: reset any staff member's password")
def reset_password(
    payload: ResetPasswordRequest,
    _: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    auth_service.admin_reset_password(payload, db)
    return {"message": f"Password reset for staff id {payload.staff_id}"}


@router.get("/sessions", response_model=list[SessionResponse], status_code=status.HTTP_200_OK,
            summary="List all active sessions for the current staff member")
def list_sessions(
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    return auth_service.get_active_sessions(current_staff.id, db)


@router.delete("/sessions/{session_id}", response_model=MessageResponse,
               status_code=status.HTTP_200_OK, summary="Revoke a specific session")
def revoke_session(
    session_id: int,
    current_staff: Staff = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    auth_service.revoke_session(session_id, current_staff.id, db)
    return {"message": "Session revoked successfully"}