"""Module 6 Phase 4 - Settlement & Payments

Revision ID: d3e5f7a9b2c4
Revises: c2d4e6f8a1b3
Create Date: 2026-05-01

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'd3e5f7a9b2c4'
down_revision: Union[str, Sequence[str], None] = 'c2d4e6f8a1b3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'payments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('bill_id', sa.Integer(), nullable=False),
        sa.Column(
            'payment_method',
            # rfid will be added to this enum when Module 7 (RFID Card System) is built
            sa.Enum('cash', 'online', 'complimentary', 'due', name='paymentmethodenum'),
            nullable=False,
        ),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('reference_number', sa.String(100), nullable=True),
        sa.Column('collected_by', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['bill_id'], ['bills.id']),
        sa.ForeignKeyConstraint(['collected_by'], ['staff.id']),
    )
    op.create_index(op.f('ix_payments_id'), 'payments', ['id'], unique=False)
    op.create_index(op.f('ix_payments_bill_id'), 'payments', ['bill_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_payments_bill_id'), table_name='payments')
    op.drop_index(op.f('ix_payments_id'), table_name='payments')
    op.drop_table('payments')
    op.execute("DROP TYPE IF EXISTS paymentmethodenum")
