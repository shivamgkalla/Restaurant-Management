"""Module 6 bug fixes — Numeric columns, bill_number sequence, partial unique indexes

Revision ID: f1a2b3c4d5e6
Revises: d3e5f7a9b2c4
Create Date: 2026-05-04

Changes:
- Float → Numeric(10,2) for all monetary columns in bills, payments, discount_configs
- Float → Numeric(6,4) for rate columns in tax_configs
- bill_number_seq sequence to eliminate race condition in bill number generation
- Partial unique indexes on tax_configs.name and discount_configs.name (active rows only)
  replacing the full unique constraints so deactivated names can be reused
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'f1a2b3c4d5e6'
down_revision: Union[str, Sequence[str], None] = 'd3e5f7a9b2c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── bills: Float → Numeric(10,2) ────────────────────────────────────────
    op.alter_column('bills', 'subtotal',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'discount_value',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'discount_amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'taxable_amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'cgst_amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'sgst_amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'igst_amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'total_tax',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('bills', 'grand_total',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)

    # ── payments: Float → Numeric(10,2) ─────────────────────────────────────
    op.alter_column('payments', 'amount',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)

    # ── tax_configs: Float → Numeric(6,4) ───────────────────────────────────
    op.alter_column('tax_configs', 'total_rate',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(6, 4),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'cgst_rate',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(6, 4),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'sgst_rate',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(6, 4),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'igst_rate',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(6, 4),
                    existing_nullable=False)

    # ── discount_configs: Float → Numeric(10,2) ──────────────────────────────
    op.alter_column('discount_configs', 'max_value',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)
    op.alter_column('discount_configs', 'approval_threshold',
                    existing_type=sa.Float(),
                    type_=sa.Numeric(10, 2),
                    existing_nullable=False)

    # ── bill_number_seq: atomic sequence for race-free bill numbers ──────────
    op.execute("CREATE SEQUENCE IF NOT EXISTS bill_number_seq START 1")

    # ── tax_configs.name: replace full unique constraint with partial index ───
    # The full unique constraint blocks reuse of names from deactivated configs.
    # The partial index only enforces uniqueness among active rows.
    op.drop_constraint('tax_configs_name_key', 'tax_configs', type_='unique')
    op.execute(
        "CREATE UNIQUE INDEX uq_tax_configs_name_active "
        "ON tax_configs (name) WHERE is_active = TRUE"
    )

    # ── discount_configs.name: same treatment ────────────────────────────────
    op.drop_constraint('discount_configs_name_key', 'discount_configs', type_='unique')
    op.execute(
        "CREATE UNIQUE INDEX uq_discount_configs_name_active "
        "ON discount_configs (name) WHERE is_active = TRUE"
    )


def downgrade() -> None:
    # Restore full unique constraints
    op.drop_index('uq_discount_configs_name_active', table_name='discount_configs')
    op.create_unique_constraint('discount_configs_name_key', 'discount_configs', ['name'])

    op.drop_index('uq_tax_configs_name_active', table_name='tax_configs')
    op.create_unique_constraint('tax_configs_name_key', 'tax_configs', ['name'])

    # Drop the bill number sequence
    op.execute("DROP SEQUENCE IF EXISTS bill_number_seq")

    # Revert discount_configs columns
    op.alter_column('discount_configs', 'approval_threshold',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('discount_configs', 'max_value',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)

    # Revert tax_configs columns
    op.alter_column('tax_configs', 'igst_rate',
                    existing_type=sa.Numeric(6, 4),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'sgst_rate',
                    existing_type=sa.Numeric(6, 4),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'cgst_rate',
                    existing_type=sa.Numeric(6, 4),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('tax_configs', 'total_rate',
                    existing_type=sa.Numeric(6, 4),
                    type_=sa.Float(),
                    existing_nullable=False)

    # Revert payments columns
    op.alter_column('payments', 'amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)

    # Revert bills columns
    op.alter_column('bills', 'grand_total',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'total_tax',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'igst_amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'sgst_amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'cgst_amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'taxable_amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'discount_amount',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'discount_value',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
    op.alter_column('bills', 'subtotal',
                    existing_type=sa.Numeric(10, 2),
                    type_=sa.Float(),
                    existing_nullable=False)
