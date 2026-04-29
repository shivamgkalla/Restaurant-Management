"""Module 6 Phase 2 - Bill model

Revision ID: b7c3d1e2f4a5
Revises: e3f1a2b4c5d6
Create Date: 2026-04-29

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'b7c3d1e2f4a5'
down_revision: Union[str, Sequence[str], None] = 'e3f1a2b4c5d6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'bills',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('bill_number', sa.String(20), nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('subtotal', sa.Float(), nullable=False),
        sa.Column('discount_type', sa.Enum('none', 'percentage', 'fixed', name='discounttypeenum'), nullable=False),
        sa.Column('discount_value', sa.Float(), nullable=False),
        sa.Column('discount_amount', sa.Float(), nullable=False),
        sa.Column('discount_reason', sa.String(255), nullable=True),
        sa.Column('discount_approved_by', sa.Integer(), nullable=True),
        sa.Column('taxable_amount', sa.Float(), nullable=False),
        sa.Column('cgst_amount', sa.Float(), nullable=False),
        sa.Column('sgst_amount', sa.Float(), nullable=False),
        sa.Column('igst_amount', sa.Float(), nullable=False),
        sa.Column('total_tax', sa.Float(), nullable=False),
        sa.Column('is_tax_inclusive', sa.Boolean(), nullable=False),
        sa.Column('grand_total', sa.Float(), nullable=False),
        sa.Column('status', sa.Enum('draft', 'settled', 'cancelled', name='billstatusenum'), nullable=False),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_by', sa.Integer(), nullable=False),
        sa.Column('settled_at', sa.DateTime(), nullable=True),
        sa.Column('settled_by', sa.Integer(), nullable=True),
        sa.Column('cancelled_at', sa.DateTime(), nullable=True),
        sa.Column('cancelled_by', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('bill_number'),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id']),
        sa.ForeignKeyConstraint(['created_by'], ['staff.id']),
        sa.ForeignKeyConstraint(['settled_by'], ['staff.id']),
        sa.ForeignKeyConstraint(['cancelled_by'], ['staff.id']),
        sa.ForeignKeyConstraint(['discount_approved_by'], ['staff.id']),
    )
    op.create_index(op.f('ix_bills_id'), 'bills', ['id'], unique=False)
    op.create_index(op.f('ix_bills_bill_number'), 'bills', ['bill_number'], unique=True)
    op.create_index(op.f('ix_bills_order_id'), 'bills', ['order_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_bills_order_id'), table_name='bills')
    op.drop_index(op.f('ix_bills_bill_number'), table_name='bills')
    op.drop_index(op.f('ix_bills_id'), table_name='bills')
    op.drop_table('bills')
    op.execute("DROP TYPE IF EXISTS billstatusenum")
    op.execute("DROP TYPE IF EXISTS discounttypeenum")
