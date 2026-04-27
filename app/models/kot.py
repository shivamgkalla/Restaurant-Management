from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class KOT(Base):
    __tablename__ = "kot_slips"

    id = Column(Integer, primary_key=True, index=True)
    kot_number = Column(String(50), unique=True, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    station_id = Column(Integer, ForeignKey("kitchen_stations.id"), nullable=True)
    is_printed = Column(Boolean, default=False)
    is_urgent = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

    order = relationship("Order", back_populates="kot_slips")
    station = relationship("KitchenStation", back_populates="kot_slips")