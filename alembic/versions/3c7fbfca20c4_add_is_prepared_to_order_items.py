"""add_is_prepared_to_order_items

Revision ID: 3c7fbfca20c4
Revises: 4b4cb7dac7a3
Create Date: 2026-05-11 11:49:26.187001

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3c7fbfca20c4'
down_revision: Union[str, Sequence[str], None] = '4b4cb7dac7a3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('order_items', sa.Column('is_prepared', sa.Boolean(), nullable=False, server_default='false'))


def downgrade() -> None:
    op.drop_column('order_items', 'is_prepared')
