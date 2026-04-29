"""merge heads

Revision ID: df879ba3249b
Revises: b30bd535bba4
Create Date: 2026-04-28 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'df879ba3249b'
down_revision: Union[str, Sequence[str], None] = 'b30bd535bba4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
