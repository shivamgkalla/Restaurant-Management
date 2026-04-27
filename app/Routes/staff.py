from typing import Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_staff, require_admin, require_admin_or_manager
from app.models.user import Staff
from app.services import staff_service
from app.schemas import (
    StaffCreateRequest,
    StaffUpdateRequest,
    StaffDeactivateRequest,
    StaffResponse,
    StaffListResponse,
    MessageResponse,
)

router = APIRouter(prefix="/staff", tags=["Staff"])


@router.post(
    "/",
    response_model=StaffResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new staff member (admin only)",
)
def create_staff(
    payload: StaffCreateRequest,
    _: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return staff_service.create_staff(payload, db)


@router.get(
    "/",
    response_model=StaffListResponse,
    status_code=status.HTTP_200_OK,
    summary="List all staff (admin or manager)",
)
def list_staff(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    is_active: Optional[bool] = Query(None),
    role_id: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    _: Staff = Depends(require_admin_or_manager),
    db: Session = Depends(get_db),
):
    items, total = staff_service.get_all_staff(
        db, skip=skip, limit=limit, is_active=is_active, role_id=role_id, search=search
    )
    return {"total": total, "items": items}


@router.get(
    "/me",
    response_model=StaffResponse,
    status_code=status.HTTP_200_OK,
    summary="Get own staff profile",
)
def get_me(current_staff: Staff = Depends(get_current_staff)):
    return current_staff


@router.get(
    "/{staff_id}",
    response_model=StaffResponse,
    status_code=status.HTTP_200_OK,
    summary="Get a specific staff member by ID (admin or manager)",
)
def get_staff(
    staff_id: int,
    _: Staff = Depends(require_admin_or_manager),
    db: Session = Depends(get_db),
):
    return staff_service.get_staff_by_id(staff_id, db)


@router.put(
    "/{staff_id}",
    response_model=StaffResponse,
    status_code=status.HTTP_200_OK,
    summary="Update staff details (admin only)",
)
def update_staff(
    staff_id: int,
    payload: StaffUpdateRequest,
    _: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return staff_service.update_staff(staff_id, payload, db)


@router.post(
    "/{staff_id}/deactivate",
    response_model=StaffResponse,
    status_code=status.HTTP_200_OK,
    summary="Deactivate a staff member (admin only)",
)
def deactivate_staff(
    staff_id: int,
    payload: StaffDeactivateRequest,
    current_staff: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return staff_service.deactivate_staff(staff_id, payload, db, current_staff.id)


@router.post(
    "/{staff_id}/reactivate",
    response_model=StaffResponse,
    status_code=status.HTTP_200_OK,
    summary="Reactivate a staff member (admin only)",
)
def reactivate_staff(
    staff_id: int,
    _: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
    return staff_service.reactivate_staff(staff_id, db)
