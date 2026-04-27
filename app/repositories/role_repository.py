from typing import Optional
from sqlalchemy.orm import Session

from app.models.role import Role


class RoleRepository:

    def get_by_id(self, db: Session, role_id: int) -> Optional[Role]:
        return db.query(Role).filter(Role.id == role_id).first()

    def get_by_name(self, db: Session, name: str) -> Optional[Role]:
        return db.query(Role).filter(Role.name == name).first()

    def get_all(self, db: Session) -> list[Role]:
        return db.query(Role).order_by(Role.name).all()

    def create(self, db: Session, role: Role) -> Role:
        db.add(role)
        db.commit()
        db.refresh(role)
        return role


role_repo = RoleRepository()
