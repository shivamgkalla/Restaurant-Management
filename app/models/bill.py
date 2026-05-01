from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class BillStatusEnum(str, enum.Enum):
    draft = "draft"
    settled = "settled"
    cancelled = "cancelled"


class DiscountTypeEnum(str, enum.Enum):
    none = "none"
    percentage = "percentage"
    fixed = "fixed"


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True, index=True)
    bill_number = Column(String(20), unique=True, nullable=False, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, index=True)

    # Snapshot of order total at the time the bill was generated.
    # Not recalculated later — bills are frozen once created.
    subtotal = Column(Float, nullable=False)

    # Discount fields are stored but set to zero for now.
    # Billing - Discount Management will add the actual apply-discount logic.
    discount_type = Column(Enum(DiscountTypeEnum), default=DiscountTypeEnum.none, nullable=False)
    discount_value = Column(Float, default=0.0, nullable=False)
    discount_amount = Column(Float, default=0.0, nullable=False)
    discount_reason = Column(String(255), nullable=True)
    discount_approved_by = Column(Integer, ForeignKey("staff.id"), nullable=True)

    # Tax breakdown
    taxable_amount = Column(Float, nullable=False)
    cgst_amount = Column(Float, default=0.0, nullable=False)
    sgst_amount = Column(Float, default=0.0, nullable=False)
    igst_amount = Column(Float, default=0.0, nullable=False)
    total_tax = Column(Float, default=0.0, nullable=False)
    is_tax_inclusive = Column(Boolean, default=False, nullable=False)

    # Grand total
    grand_total = Column(Float, nullable=False)

    status = Column(Enum(BillStatusEnum), default=BillStatusEnum.draft, nullable=False)
    notes = Column(Text, nullable=True)

    # Audit trail
    created_by = Column(Integer, ForeignKey("staff.id"), nullable=False)
    settled_at = Column(DateTime, nullable=True)
    settled_by = Column(Integer, ForeignKey("staff.id"), nullable=True)
    cancelled_at = Column(DateTime, nullable=True)
    cancelled_by = Column(Integer, ForeignKey("staff.id"), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    order = relationship("Order")

    # Four separate staff columns all point to the same Staff table.
    # SQLAlchemy gets confused about which FK to use for each relationship,
    # so we tell it explicitly with foreign_keys.
    creator = relationship("Staff", foreign_keys=[created_by])
    settler = relationship("Staff", foreign_keys=[settled_by])
    canceller = relationship("Staff", foreign_keys=[cancelled_by])
    discount_approver = relationship("Staff", foreign_keys=[discount_approved_by])

    payments = relationship("Payment", back_populates="bill")
