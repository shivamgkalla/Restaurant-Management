import enum
import random
import string
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Enum, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


class CustomerType(str, enum.Enum):
    new = "new"
    regular = "regular"
    vip = "vip"


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, autoincrement=True)

    # Auto-generated unique customer ID (e.g. CUST-A1B2C3)
    customer_id = Column(String(20), unique=True, nullable=False, index=True)

    # Mandatory fields
    name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, nullable=False, index=True)

    # Optional fields
    email = Column(String(150), unique=True, nullable=True)
    address = Column(Text, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)  # preferences / special notes

    # Classification
    customer_type = Column(
        Enum(CustomerType),
        default=CustomerType.new,
        nullable=False,
    )

    # Metadata
    is_active = Column(Boolean, default=True, nullable=False)
    registered_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(
    DateTime,                   
    server_default=func.now(),
    onupdate=func.now(),
    nullable=False,
)

    @staticmethod
    def generate_customer_id() -> str:
        """Generate a unique customer ID in format CUST-XXXXXXXX."""
        suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
        return f"CUST-{suffix}"