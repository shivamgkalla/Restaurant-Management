from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class TaxConfig(Base):
    __tablename__ = "tax_configs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    total_rate = Column(Float, nullable=False)
    cgst_rate = Column(Float, nullable=False)
    sgst_rate = Column(Float, nullable=False)
    igst_rate = Column(Float, nullable=False, default=0.0)
    is_igst_mode = Column(Boolean, default=False, nullable=False)
    is_inclusive = Column(Boolean, default=False, nullable=False)
    is_default = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    categories = relationship("Category", back_populates="tax_config")
