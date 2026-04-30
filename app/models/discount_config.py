from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Enum
from sqlalchemy.sql import func
from app.database import Base
import enum


class DiscountConfigTypeEnum(str, enum.Enum):
    percentage = "percentage"
    fixed = "fixed"


class DiscountConfig(Base):
    __tablename__ = "discount_configs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    discount_type = Column(Enum(DiscountConfigTypeEnum, name="discountconfigtypeenum"), nullable=False)

    # Hard ceiling — nobody can apply a discount beyond this, regardless of role
    max_value = Column(Float, nullable=False)

    # Cashiers can apply discounts up to this value without any approval.
    # Above this, a manager or admin must co-sign by providing their staff ID.
    # Admin Controls module (Module 9) will add email OTP on top of this
    # co-sign step as an additional verification layer when that module is built.
    approval_threshold = Column(Float, nullable=False)

    # When True, discount is applied to subtotal before tax is computed.
    # When False, tax is computed on the full subtotal and discount reduces the grand total.
    discount_before_tax = Column(Boolean, default=True, nullable=False)

    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
