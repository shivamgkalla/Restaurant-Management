from sqlalchemy import Column, Integer, String, Boolean, DateTime, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class TaxConfig(Base):
    __tablename__ = "tax_configs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    total_rate = Column(Numeric(6, 4), nullable=False)
    cgst_rate = Column(Numeric(6, 4), nullable=False)
    sgst_rate = Column(Numeric(6, 4), nullable=False)
    igst_rate = Column(Numeric(6, 4), nullable=False, default=0.0)
    is_igst_mode = Column(Boolean, default=False, nullable=False)
    is_inclusive = Column(Boolean, default=False, nullable=False)
    is_default = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Includes inactive categories too — so deleting a tax config that has any linked category is blocked, even if currently inactive
    categories = relationship("Category", back_populates="tax_config")
