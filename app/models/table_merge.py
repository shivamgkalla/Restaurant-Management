from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class TableMerge(Base):
    __tablename__ = "table_merges"

    id = Column(Integer, primary_key=True, index=True)
    primary_table_id = Column(Integer, ForeignKey("restaurant_tables.id"), nullable=False)
    merged_table_id = Column(Integer, ForeignKey("restaurant_tables.id"), nullable=False)
    merged_at = Column(DateTime, server_default=func.now())
    unmerged_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

    primary_table = relationship("RestaurantTable", foreign_keys=[primary_table_id], back_populates="merges_as_primary")
    merged_table = relationship("RestaurantTable", foreign_keys=[merged_table_id], back_populates="merges_as_secondary")