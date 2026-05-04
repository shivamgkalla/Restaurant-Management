from typing import Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_staff, require_admin, require_admin_or_manager
from app.database import get_db
from app.models.user import Staff
from app.schemas import StaffCreateRequest, StaffDeactivateRequest, StaffUpdateRequest
from app.services import staff_service
from app.core.custom_response import CustomResponse
from app.core.http_constants import HttpConstants
from app.utils.pagination.params import PaginationParams, pagination_params

C = HttpConstants.HttpResponseCodes

router = APIRouter(prefix="/staff", tags=["Staff"])


@router.get("/", status_code=status.HTTP_200_OK, summary="List all staff (admin or manager)")
def list_staff(
    params:    PaginationParams = Depends(pagination_params),
    # is_active: Optional[bool]  = Query(None),
    search:    Optional[str]   = Query(None),
    _:         Staff           = Depends(require_admin_or_manager),
    db:        Session         = Depends(get_db),
):
    return staff_service.get_all_staff(db, params=params,  search=search).to_json()


@router.post("/", status_code=status.HTTP_201_CREATED, summary="Create a new staff member (admin only)")
def create_staff(
    payload: StaffCreateRequest,
    _:       Staff   = Depends(require_admin),
    db:      Session = Depends(get_db),
):
    return staff_service.create_staff(payload, db).to_json()


@router.get("/me", status_code=status.HTTP_200_OK, summary="Get own staff profile")
def get_me(current_staff: Staff = Depends(get_current_staff)):
    return CustomResponse(C.OK, "Staff fetched successfully", data=current_staff).to_json()


@router.get("/{staff_id}", status_code=status.HTTP_200_OK, summary="Get a specific staff member by ID")
def get_staff(
    staff_id: int,
    _:        Staff   = Depends(require_admin_or_manager),
    db:       Session = Depends(get_db),
):
    return staff_service.get_staff_by_id(staff_id, db).to_json()


@router.put("/{staff_id}", status_code=status.HTTP_200_OK, summary="Update staff details (admin only)")
def update_staff(
    staff_id: int,
    payload:  StaffUpdateRequest,
    _:        Staff   = Depends(require_admin),
    db:       Session = Depends(get_db),
):
    return staff_service.update_staff(staff_id, payload, db).to_json()


# @router.post("/{staff_id}/deactivate", status_code=status.HTTP_200_OK, summary="Deactivate a staff member (admin only)")
# def deactivate_staff(
#     staff_id:      int,
#     payload:       StaffDeactivateRequest,
#     current_staff: Staff   = Depends(require_admin),
#     db:            Session = Depends(get_db),
# ):
#     return staff_service.deactivate_staff(staff_id, payload, db, current_staff.id).to_json()


# @router.post("/{staff_id}/reactivate", status_code=status.HTTP_200_OK, summary="Reactivate a staff member (admin only)")
# def reactivate_staff(
#     staff_id: int,
#     _:        Staff   = Depends(require_admin),
#     db:       Session = Depends(get_db),
# ):
#     return staff_service.reactivate_staff(staff_id, db).to_json()

@router.delete(
    "/{staff_id}",
    status_code=status.HTTP_200_OK,
    summary="Permanently delete a staff member (admin only)",
)
def delete_staff(
    staff_id: int,
    current_staff: Staff = Depends(require_admin),
    db: Session = Depends(get_db),
):
   return staff_service.delete_staff(staff_id, db, current_staff.id).to_json()