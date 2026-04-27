from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.database import get_db
from app.models.user import Staff

bearer_scheme = HTTPBearer()


def get_current_staff(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> Staff:
    token = credentials.credentials
    payload = decode_token(token)

    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    staff_id = int(payload["sub"])
    staff = db.query(Staff).filter(Staff.id == staff_id, Staff.is_active == True).first()

    if not staff:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Staff not found or deactivated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return staff


def require_admin(current_staff: Staff = Depends(get_current_staff)) -> Staff:
    if current_staff.role.name != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_staff


def require_admin_or_manager(current_staff: Staff = Depends(get_current_staff)) -> Staff:
    if current_staff.role.name not in ("admin", "manager"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or Manager access required",
        )
    return current_staff
