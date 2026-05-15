"""Module 10 Phase 2 — Customer self-order: orders.table_id nullable (home / delivery)

Revision ID: c8e9f0a1b2c3
Revises: b1c2d3e4f5a6
Create Date: 2026-05-14

Changes:
- orders: make table_id nullable so customer-created orders do not require a restaurant table
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c8e9f0a1b2c3"
down_revision: Union[str, Sequence[str], None] = "b1c2d3e4f5a6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "orders",
        "table_id",
        existing_type=sa.Integer(),
        nullable=True,
    )


def downgrade() -> None:
    # Fails if any order has table_id NULL — fix data before downgrade
    op.alter_column(
        "orders",
        "table_id",
        existing_type=sa.Integer(),
        nullable=False,
    )
