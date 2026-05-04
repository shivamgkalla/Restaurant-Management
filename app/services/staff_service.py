from typing import Optional

from sqlalchemy.orm import Session
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.core.security import hash_password
from app.models.user import Staff
from app.repositories import staff_repo, role_repo
from app.schemas.staff.requests import StaffCreateRequest, StaffDeactivateRequest, StaffUpdateRequest
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult

C = HttpConstants.HttpResponseCodes


# ── Private Helpers ───────────────────────────────────────────────────────────

def _require_role_exists(db: Session, role_id: int) -> CustomResponse | None:
    if not role_repo.get_by_id(db, role_id):
        return CustomResponse(C.NOT_FOUND, f"Role with id {role_id} not found")
    return None


def _require_staff_exists(db: Session, staff_id: int) -> tuple[Staff | None, CustomResponse | None]:
    staff = staff_repo.get_by_id(db, staff_id)
    if not staff:
        return None, CustomResponse(C.NOT_FOUND, f"Staff with id {staff_id} not found")
    return staff, None


# ── Service Functions ─────────────────────────────────────────────────────────

def create_staff(payload: StaffCreateRequest, db: Session) -> CustomResponse:
    if staff_repo.get_by_employee_id(db, payload.employee_id):
        return CustomResponse(C.CONFLICT, f"Employee ID '{payload.employee_id}' already exists")
    if staff_repo.get_by_username(db, payload.username):
        return CustomResponse(C.CONFLICT, f"Username '{payload.username}' is already taken")
    if staff_repo.get_by_phone(db, payload.phone):
        return CustomResponse(C.CONFLICT, f"Phone number '{payload.phone}' is already registered")

    error = _require_role_exists(db, payload.role_id)
    if error:
        return error

    staff = Staff(
        employee_id       = payload.employee_id,
        name              = payload.name,
        phone             = payload.phone,
        email             = payload.email,
        address           = payload.address,
        date_of_joining   = payload.date_of_joining,
        emergency_contact = payload.emergency_contact,
        notes             = payload.notes,
        role_id           = payload.role_id,
        username          = payload.username,
        password_hash     = hash_password(payload.password),
        is_active         = True,
    )
    created = staff_repo.create(db, staff)
    return CustomResponse(C.CREATED, "Staff created successfully", data=created)


def get_all_staff(
    db:     Session,
    params: PaginationParams,
    search: Optional[str] = None,
) -> CustomResponse:
    result: PagedResult = staff_repo.get_all(
        db,
        params = params,
        search = search,
    )
    return CustomResponse(C.OK, "Staff fetched successfully", data=result.items, meta=result.meta)


def get_staff_by_id(staff_id: int, db: Session) -> CustomResponse:
    staff, error = _require_staff_exists(db, staff_id)
    if error:
        return error
    return CustomResponse(C.OK, "Staff fetched successfully", data=staff)


def update_staff(staff_id: int, payload: StaffUpdateRequest, db: Session) -> CustomResponse:
    staff, error = _require_staff_exists(db, staff_id)
    if error:
        return error

    update_data = payload.model_dump(exclude_unset=True)

    if "role_id" in update_data:
        error = _require_role_exists(db, update_data["role_id"])
        if error:
            return error

    if "username" in update_data and update_data["username"] != staff.username:
        existing = staff_repo.get_by_username(db, update_data["username"])
        if existing and existing.id != staff_id:
            return CustomResponse(C.CONFLICT, f"Username '{update_data['username']}' is already taken")

    if "phone" in update_data and update_data["phone"] != staff.phone:
        existing = staff_repo.get_by_phone(db, update_data["phone"])
        if existing and existing.id != staff_id:
            return CustomResponse(C.CONFLICT, f"Phone '{update_data['phone']}' is already registered to another staff member")

    if "password" in update_data:
        staff.password_hash = hash_password(update_data.pop("password"))

    for field, value in update_data.items():
        setattr(staff, field, value)

    updated = staff_repo.save(db, staff)
    return CustomResponse(C.OK, "Staff updated successfully", data=updated)


def deactivate_staff(
    staff_id:            int,
    payload:             StaffDeactivateRequest,
    db:                  Session,
    requesting_staff_id: int,
) -> CustomResponse:
    if staff_id == requesting_staff_id:
        return CustomResponse(C.BAD_REQUEST, "You cannot deactivate your own account")

    staff, error = _require_staff_exists(db, staff_id)
    if error:
        return error

    if not staff.is_active:
        return CustomResponse(C.BAD_REQUEST, "Staff is already deactivated")

    staff.is_active = False
    if payload.reason:
        staff.notes = payload.reason
    if payload.resignation_date:
        staff.resignation_date = payload.resignation_date

    staff_repo.revoke_all_sessions(db, staff_id)
    updated = staff_repo.save(db, staff)
    return CustomResponse(C.OK, "Staff deactivated successfully", data=updated)


def reactivate_staff(staff_id: int, db: Session) -> CustomResponse:
    staff, error = _require_staff_exists(db, staff_id)
    if error:
        return error

    if staff.is_active:
        return CustomResponse(C.BAD_REQUEST, "Staff is already active")

    staff.is_active = True
    staff.resignation_date = None
    updated = staff_repo.save(db, staff)
    return CustomResponse(C.OK, "Staff reactivated successfully", data=updated)


def delete_staff(staff_id: int, db: Session, requesting_staff_id: int) -> CustomResponse:
    if staff_id == requesting_staff_id:
        return CustomResponse(C.BAD_REQUEST, "You cannot delete your own account")

    staff, error = _require_staff_exists(db, staff_id)
    if error:
        return error

    staff_repo.revoke_all_sessions(db, staff_id)
    staff_repo.delete(db, staff)
    return CustomResponse(C.OK, "Staff deleted successfully")