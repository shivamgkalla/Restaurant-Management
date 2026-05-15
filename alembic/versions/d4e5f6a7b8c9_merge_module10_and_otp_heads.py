"""merge module10 table_id nullable + otp verifications heads

Revision ID: d4e5f6a7b8c9
Revises: c8e9f0a1b2c3, 8c2382ddf19e
Create Date: 2026-05-15

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d4e5f6a7b8c9"
down_revision: Union[str, Sequence[str], None] = ("c8e9f0a1b2c3", "8c2382ddf19e")
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
