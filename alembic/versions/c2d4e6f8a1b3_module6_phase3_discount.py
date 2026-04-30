"""Module 6 Phase 3 - Discount Configuration

Revision ID: c2d4e6f8a1b3
Revises: b7c3d1e2f4a5
Create Date: 2026-04-30

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'c2d4e6f8a1b3'
down_revision: Union[str, Sequence[str], None] = 'b7c3d1e2f4a5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'discount_configs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('discount_type', sa.Enum('percentage', 'fixed', name='discountconfigtypeenum'), nullable=False),
        sa.Column('max_value', sa.Float(), nullable=False),
        sa.Column('approval_threshold', sa.Float(), nullable=False),
        sa.Column('discount_before_tax', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name'),
    )
    op.create_index(op.f('ix_discount_configs_id'), 'discount_configs', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_discount_configs_id'), table_name='discount_configs')
    op.drop_table('discount_configs')
    op.execute("DROP TYPE IF EXISTS discountconfigtypeenum")
