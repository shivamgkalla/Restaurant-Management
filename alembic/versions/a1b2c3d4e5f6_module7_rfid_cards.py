"""Module 7 — RFID Card System

Revision ID: a1b2c3d4e5f6
Revises: a2b3c4d5e6f7
Create Date: 2026-05-06

Changes:
- Add rfid to paymentmethodenum (must run outside transaction)
- Create rfid_cards table
- Create rfid_card_transactions table
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = 'a2b3c4d5e6f7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── Add 'rfid' to the existing paymentmethodenum ─────────────────────────
    # PostgreSQL requires ALTER TYPE ... ADD VALUE to run outside a transaction.
    # We get the raw connection and switch to AUTOCOMMIT for this one statement.
    connection = op.get_bind()
    connection.execute(sa.text("COMMIT"))
    connection.execute(sa.text("ALTER TYPE paymentmethodenum ADD VALUE IF NOT EXISTS 'rfid'"))

    # ── rfid_cards ────────────────────────────────────────────────────────────
    op.create_table(
        'rfid_cards',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('card_uid', sa.String(50), nullable=False, unique=True, index=True),
        sa.Column(
            'status',
            sa.Enum('available', 'active', 'blocked', 'lost', name='rfidcardstatusenum'),
            nullable=False,
            server_default='available',
        ),
        sa.Column('balance', sa.Numeric(10, 2), nullable=False, server_default='0.00'),
        sa.Column('customer_id', sa.Integer(), sa.ForeignKey('customers.id', ondelete='SET NULL'), nullable=True),
        sa.Column('bound_at', sa.DateTime(), nullable=True),
        sa.Column('bound_by', sa.Integer(), sa.ForeignKey('staff.id', ondelete='SET NULL'), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
    )

    # ── rfid_card_transactions ────────────────────────────────────────────────
    op.create_table(
        'rfid_card_transactions',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('card_id', sa.Integer(), sa.ForeignKey('rfid_cards.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column(
            'transaction_type',
            sa.Enum('load', 'debit', 'refund', name='rfidtransactiontypeenum'),
            nullable=False,
        ),
        sa.Column('amount', sa.Numeric(10, 2), nullable=False),
        # How the customer paid for a load (cash/online). Null for debits/refunds.
        sa.Column(
            'payment_method',
            sa.Enum('cash', 'online', name='rfidloadpaymentmethodenum'),
            nullable=True,
        ),
        sa.Column('reference_number', sa.String(100), nullable=True),
        sa.Column('bill_id', sa.Integer(), sa.ForeignKey('bills.id', ondelete='SET NULL'), nullable=True),
        sa.Column('performed_by', sa.Integer(), sa.ForeignKey('staff.id', ondelete='SET NULL'), nullable=False),
        sa.Column('note', sa.String(255), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('rfid_card_transactions')
    op.drop_table('rfid_cards')
    op.execute("DROP TYPE IF EXISTS rfidloadpaymentmethodenum")
    op.execute("DROP TYPE IF EXISTS rfidtransactiontypeenum")
    op.execute("DROP TYPE IF EXISTS rfidcardstatusenum")
    # PostgreSQL does not support removing enum values; rfid stays in paymentmethodenum on downgrade
