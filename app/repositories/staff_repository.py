from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.models.user import Staff, StaffSession
from app.utils.pagination.paginate import paginate
from app.utils.pagination.params import PaginationParams
from app.utils.pagination.result import PagedResult


class StaffRepository:

    def get_by_id(self, db: Session, staff_id: int) -> Optional[Staff]:
        return db.query(Staff).filter(Staff.id == staff_id).first()

    def get_by_username(self, db: Session, username: str) -> Optional[Staff]:
        return db.query(Staff).filter(Staff.username == username).first()

    def get_by_employee_id(self, db: Session, employee_id: str) -> Optional[Staff]:
        return db.query(Staff).filter(Staff.employee_id == employee_id).first()

    def get_by_phone(self, db: Session, phone: str) -> Optional[Staff]:
        return db.query(Staff).filter(Staff.phone == phone).first()

    def get_active_by_id(self, db: Session, staff_id: int) -> Optional[Staff]:
        return (
            db.query(Staff)
            .filter(Staff.id == staff_id, Staff.is_active == True)
            .first()
        )

    def get_all(
        self,
        db: Session,
        params: PaginationParams,                
        is_active: Optional[bool] = None,
        search:    Optional[str]  = None,
    ) -> PagedResult:                             
        query = db.query(Staff)

        if is_active is not None:
            query = query.filter(Staff.is_active == is_active)
        if search:
            term = f"%{search}%"
            query = query.filter(
                Staff.name.ilike(term)
                | Staff.username.ilike(term)
                | Staff.employee_id.ilike(term)
                | Staff.phone.ilike(term)
            )

        query = query.order_by(Staff.name)

        return paginate(query, params)            # ← one line, done

    def create(self, db: Session, staff: Staff) -> Staff:
        db.add(staff)
        db.commit()
        db.refresh(staff)
        return staff

    def save(self, db: Session, staff: Staff) -> Staff:
        db.commit()
        db.refresh(staff)
        return staff

    def get_active_session_by_token_hash(
        self, db: Session, staff_id: int, token_hash: str
    ) -> Optional[StaffSession]:
        return (
            db.query(StaffSession)
            .filter(
                StaffSession.staff_id == staff_id,
                StaffSession.refresh_token_hash == token_hash,
                StaffSession.is_active == True,
            )
            .first()
        )

    def get_session_by_id(
        self, db: Session, session_id: int, staff_id: int
    ) -> Optional[StaffSession]:
        return (
            db.query(StaffSession)
            .filter(
                StaffSession.id == session_id,
                StaffSession.staff_id == staff_id,
            )
            .first()
        )

    def get_active_sessions(self, db: Session, staff_id: int) -> list[StaffSession]:
        return (
            db.query(StaffSession)
            .filter(StaffSession.staff_id == staff_id, StaffSession.is_active == True)
            .order_by(StaffSession.last_used_at.desc())
            .all()
        )

    def create_session(self, db: Session, session: StaffSession) -> StaffSession:
        db.add(session)
        db.commit()
        db.refresh(session)
        return session

    def revoke_session(self, db: Session, session: StaffSession) -> None:
        session.is_active = False
        db.commit()

    def revoke_all_sessions(self, db: Session, staff_id: int) -> int:
        count = (
            db.query(StaffSession)
            .filter(StaffSession.staff_id == staff_id, StaffSession.is_active == True)
            .update({"is_active": False})
        )
        db.commit()
        return count


staff_repo = StaffRepository()