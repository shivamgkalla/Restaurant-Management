from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class RFIDCardStatusEnum(str, enum.Enum):
    available = "available"   # In the pool, ready to be assigned to a customer
    active = "active"         # Bound to a customer and usable for payments
    blocked = "blocked"       # Blocked by admin (lost card, damaged, etc.)
    lost = "lost"             # Reported lost — treated like blocked but kept separate for reporting


class RFIDCard(Base):
    """
    Represents a physical RFID card issued by the restaurant.

    Lifecycle: available → active (on bind) → available (on clear after settlement).
    A blocked/lost card cannot accept loads or be used for payment.
    Balance is a virtual wallet — real money is collected at the counter on load.
    """
    __tablename__ = "rfid_cards"

    id = Column(Integer, primary_key=True, autoincrement=True)

    # The unique hardware UID printed/stored on the physical RFID chip
    card_uid = Column(String(50), unique=True, nullable=False, index=True)

    status = Column(
        Enum(RFIDCardStatusEnum, name="rfidcardstatusenum"),
        nullable=False,
        default=RFIDCardStatusEnum.available,
    )

    # Running virtual balance in rupees — decremented on payment, incremented on load
    balance = Column(Numeric(10, 2), nullable=False, default=0)

    # Null when the card is in the available pool
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="SET NULL"), nullable=True)
    bound_at = Column(DateTime, nullable=True)
    bound_by = Column(Integer, ForeignKey("staff.id", ondelete="SET NULL"), nullable=True)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    customer = relationship("Customer", foreign_keys=[customer_id])
    binder = relationship("Staff", foreign_keys=[bound_by])
    transactions = relationship(
        "RFIDCardTransaction",
        back_populates="card",
        order_by="RFIDCardTransaction.created_at.desc()",
    )
