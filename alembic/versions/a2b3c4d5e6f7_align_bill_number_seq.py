"""Align bill_number_seq with existing bill numbers

Revision ID: a2b3c4d5e6f7
Revises: f1a2b3c4d5e6
Create Date: 2026-05-05

The previous migration created bill_number_seq starting at 1.
On any database that already had bill rows, the first nextval() after
migration would collide with an existing BILL-NNNN. This migration
sets the sequence to the highest existing bill number so the next
nextval() returns max + 1.

Safe to run on a fresh DB — when there are no bills, the COALESCE
falls through to 0 and is_called=false makes the next nextval() return 1.
"""
from typing import Sequence, Union
from alembic import op


revision: str = 'a2b3c4d5e6f7'
down_revision: Union[str, Sequence[str], None] = 'f1a2b3c4d5e6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Set the sequence value based on the highest existing bill number.
    # GREATEST(..., 1) ensures the value is always >= 1 (Postgres requirement).
    # is_called is True only if real bills exist — so next nextval() returns:
    #   - MAX + 1 when there are existing bills
    #   - 1 when the bills table is empty (fresh DB)
    op.execute("""
        SELECT setval(
            'bill_number_seq',
            GREATEST(
                COALESCE(
                    (SELECT MAX(CAST(SPLIT_PART(bill_number, '-', 2) AS INTEGER))
                     FROM bills
                     WHERE bill_number ~ '^BILL-[0-9]+$'),
                    0
                ),
                1
            ),
            EXISTS (SELECT 1 FROM bills WHERE bill_number ~ '^BILL-[0-9]+$')
        )
    """)


def downgrade() -> None:
    # Reset to fresh state — next nextval() returns 1
    op.execute("SELECT setval('bill_number_seq', 1, false)")
