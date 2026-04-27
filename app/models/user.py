from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    address = Column(String(255), nullable=True)
    date_of_joining = Column(DateTime, nullable=True)
    emergency_contact = Column(String(100), nullable=True)
    photo_url = Column(String(255), nullable=True)
    notes = Column(String(500), nullable=True)
    resignation_date = Column(DateTime, nullable=True)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    role = relationship("Role", back_populates="staff")


class StaffSession(Base):
    __tablename__ = "staff_sessions"

    id = Column(Integer, primary_key=True, index=True)
    staff_id = Column(Integer, ForeignKey("staff.id"), nullable=False)
    refresh_token_hash = Column(String(64), nullable=False)  # SHA-256 hex digest
    device_info = Column(String(255), nullable=True)
    ip_address = Column(String(45), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    last_used_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    expires_at = Column(DateTime, nullable=True)

    staff = relationship("Staff")
