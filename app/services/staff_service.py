from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import Staff
from app.repositories import staff_repo, role_repo
from app.schemas.staff.requests import StaffCreateRequest, StaffDeactivateRequest, StaffUpdateRequest


def _require_role_exists(db: Session, role_id: int) -> None:
    if not role_repo.get_by_id(db, role_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Role with id {role_id} not found",
        )


def _require_staff_exists(db: Session, staff_id: int) -> Staff:
    staff = staff_repo.get_by_id(db, staff_id)
    if not staff:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Staff with id {staff_id} not found",
        )
    return staff


def create_staff(payload: StaffCreateRequest, db: Session) -> Staff:
    if staff_repo.get_by_employee_id(db, payload.employee_id):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Employee ID '{payload.employee_id}' already exists",
        )
    if staff_repo.get_by_username(db, payload.username):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Username '{payload.username}' is already taken",
        )
    if staff_repo.get_by_phone(db, payload.phone):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Phone number '{payload.phone}' is already registered",
        )

    _require_role_exists(db, payload.role_id)

    staff = Staff(
        employee_id=payload.employee_id,
        name=payload.name,
        phone=payload.phone,
        email=payload.email,
        address=payload.address,
        date_of_joining=payload.date_of_joining,
        emergency_contact=payload.emergency_contact,
        notes=payload.notes,
        role_id=payload.role_id,
        username=payload.username,
        password_hash=hash_password(payload.password),
        is_active=True,
    )
    return staff_repo.create(db, staff)


def get_all_staff(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    is_active: Optional[bool] = None,
    role_id: Optional[int] = None,
    search: Optional[str] = None,
) -> tuple[list[Staff], int]:
    return staff_repo.get_all(db, skip=skip, limit=limit, is_active=is_active, role_id=role_id, search=search)


def get_staff_by_id(staff_id: int, db: Session) -> Staff:
    return _require_staff_exists(db, staff_id)


def update_staff(staff_id: int, payload: StaffUpdateRequest, db: Session) -> Staff:
    staff = _require_staff_exists(db, staff_id)
    update_data = payload.model_dump(exclude_unset=True)

    if "role_id" in update_data:
        _require_role_exists(db, update_data["role_id"])

    if "phone" in update_data and update_data["phone"] != staff.phone:
        existing = staff_repo.get_by_phone(db, update_data["phone"])
        if existing and existing.id != staff_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Phone '{update_data['phone']}' is already registered to another staff member",
            )

    for field, value in update_data.items():
        setattr(staff, field, value)

    return staff_repo.save(db, staff)


def deactivate_staff(
    staff_id: int,
    payload: StaffDeactivateRequest,
    db: Session,
    requesting_staff_id: int,
) -> Staff:
    if staff_id == requesting_staff_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot deactivate your own account",
        )

    staff = _require_staff_exists(db, staff_id)

    if not staff.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Staff is already deactivated",
        )

    staff.is_active = False
    if payload.reason:
        staff.notes = payload.reason
    if payload.resignation_date:
        staff.resignation_date = payload.resignation_date

    staff_repo.revoke_all_sessions(db, staff_id)
    return staff_repo.save(db, staff)


def reactivate_staff(staff_id: int, db: Session) -> Staff:
    staff = _require_staff_exists(db, staff_id)

    if staff.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Staff is already active",
        )

    staff.is_active = True
    staff.resignation_date = None
    return staff_repo.save(db, staff)