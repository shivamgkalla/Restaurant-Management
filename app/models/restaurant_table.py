from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class TableStatusEnum(str, enum.Enum):
    available = "available"
    occupied = "occupied"
    reserved = "reserved"
    cleaning = "cleaning"

class RestaurantTable(Base):
    __tablename__ = "restaurant_tables"

    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(String(20), unique=True, nullable=False)
    seating_capacity = Column(Integer, nullable=False)
    zone_id = Column(Integer, ForeignKey("table_zones.id"), nullable=True)
    status = Column(Enum(TableStatusEnum), default=TableStatusEnum.available)
    notes = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    pos_x = Column(Float, default=0.0)
    pos_y = Column(Float, default=0.0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    zone = relationship("TableZone", back_populates="tables")
    merges_as_primary = relationship("TableMerge", foreign_keys="TableMerge.primary_table_id", back_populates="primary_table")
    merges_as_secondary = relationship("TableMerge", foreign_keys="TableMerge.merged_table_id", back_populates="merged_table")
    transfers_from = relationship("TableTransferLog", foreign_keys="TableTransferLog.from_table_id", back_populates="from_table")
    transfers_to = relationship("TableTransferLog", foreign_keys="TableTransferLog.to_table_id", back_populates="to_table")