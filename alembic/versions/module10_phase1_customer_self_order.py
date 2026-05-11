"""Module 10 Phase 1 — Customer self-ordering: password_hash on customers, captain_id nullable on orders

Revision ID: b1c2d3e4f5a6
Revises: 4b4cb7dac7a3
Create Date: 2026-05-11

Changes:
- customers: add password_hash VARCHAR(255) nullable (existing customers unaffected)
- orders: make captain_id nullable (self-placed orders start with no captain)
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'b1c2d3e4f5a6'
down_revision: Union[str, Sequence[str], None] = '3c7fbfca20c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add password_hash to customers — nullable so existing rows are not broken
    op.add_column('customers', sa.Column('password_hash', sa.String(255), nullable=True))

    # Allow orders to have no captain (self-placed orders start unassigned)
    op.alter_column('orders', 'captain_id',
                    existing_type=sa.Integer(),
                    nullable=True)


def downgrade() -> None:
    # Revert captain_id back to NOT NULL (will fail if NULL rows exist)
    op.alter_column('orders', 'captain_id',
                    existing_type=sa.Integer(),
                    nullable=False)

    op.drop_column('customers', 'password_hash')
