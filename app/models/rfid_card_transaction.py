from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class RFIDTransactionTypeEnum(str, enum.Enum):
    load = "load"       # Customer paid real money at counter to top up the card
    debit = "debit"     # Amount deducted from card when a bill is settled
    refund = "refund"   # Remaining balance returned to customer when card is cleared


class RFIDLoadPaymentMethodEnum(str, enum.Enum):
    """How the customer paid for a card load at the counter (not the bill payment method)."""
    cash = "cash"
    online = "online"


class RFIDCardTransaction(Base):
    """
    Immutable audit trail of every money movement on an RFID card.

    Every load, debit, and refund creates one row here.
    Nothing is ever updated or deleted — this is the source of truth for card balance history.
    """
    __tablename__ = "rfid_card_transactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    card_id = Column(Integer, ForeignKey("rfid_cards.id", ondelete="CASCADE"), nullable=False, index=True)

    transaction_type = Column(
        Enum(RFIDTransactionTypeEnum, name="rfidtransactiontypeenum"),
        nullable=False,
    )

    amount = Column(Numeric(10, 2), nullable=False)

    # Only set for load transactions — how the customer paid the restaurant at the counter
    payment_method = Column(
        Enum(RFIDLoadPaymentMethodEnum, name="rfidloadpaymentmethodenum"),
        nullable=True,
    )

    # UPI ref, card transaction ID, etc. — only relevant for online loads
    reference_number = Column(String(100), nullable=True)

    # Set only for debit transactions — links the deduction back to the specific bill it paid
    bill_id = Column(Integer, ForeignKey("bills.id", ondelete="SET NULL"), nullable=True)

    performed_by = Column(Integer, ForeignKey("staff.id", ondelete="SET NULL"), nullable=False)

    # Optional free-text note (e.g. "refund given in cash on clear")
    note = Column(String(255), nullable=True)

    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    card = relationship("RFIDCard", back_populates="transactions")
    bill = relationship("Bill", foreign_keys=[bill_id])
    performer = relationship("Staff", foreign_keys=[performed_by])
