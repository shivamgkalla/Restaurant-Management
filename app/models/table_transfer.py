from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class TableTransferLog(Base):
    __tablename__ = "table_transfer_logs"

    id = Column(Integer, primary_key=True, index=True)
    from_table_id = Column(Integer, ForeignKey("restaurant_tables.id"), nullable=False)
    to_table_id = Column(Integer, ForeignKey("restaurant_tables.id"), nullable=False)
    reason = Column(String(255), nullable=True)
    transferred_by = Column(Integer, ForeignKey("staff.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    from_table = relationship("RestaurantTable", foreign_keys=[from_table_id], back_populates="transfers_from")
    to_table = relationship("RestaurantTable", foreign_keys=[to_table_id], back_populates="transfers_to")
    staff = relationship("Staff")