from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class PaymentMethodEnum(str, enum.Enum):
    cash = "cash"
    online = "online"
    complimentary = "complimentary"
    due = "due"
    # rfid will be added here when Module 7 (RFID Card System) is built


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    bill_id = Column(Integer, ForeignKey("bills.id"), nullable=False, index=True)
    payment_method = Column(Enum(PaymentMethodEnum, name="paymentmethodenum"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)

    # Optional — mainly for online payments (UPI ref, card transaction ID, etc.)
    reference_number = Column(String(100), nullable=True)

    # Staff who recorded this payment at the counter
    collected_by = Column(Integer, ForeignKey("staff.id"), nullable=False)

    created_at = Column(DateTime, server_default=func.now())

    bill = relationship("Bill", back_populates="payments")
    collector = relationship("Staff", foreign_keys=[collected_by])
