"""add station fk to menu_items and remove order station payload

Revision ID: 4b4cb7dac7a3
Revises: a1b2c3d4e5f6
Create Date: 2026-05-06 18:00:06.652956

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4b4cb7dac7a3'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('menu_items', sa.Column('station_id', sa.Integer(), nullable=True))

    # Ensure at least one kitchen station exists for backfilling existing menu items.
    op.execute(
        """
        INSERT INTO kitchen_stations (name, is_active)
        SELECT 'Default Station', true
        WHERE NOT EXISTS (SELECT 1 FROM kitchen_stations)
        """
    )

    # Backfill existing menu_items rows before making station_id NOT NULL.
    op.execute(
        """
        UPDATE menu_items
        SET station_id = (
            SELECT id FROM kitchen_stations ORDER BY id LIMIT 1
        )
        WHERE station_id IS NULL
        """
    )

    op.alter_column('menu_items', 'station_id', nullable=False)
    op.create_foreign_key(
        'fk_menu_items_station_id_kitchen_stations',
        'menu_items',
        'kitchen_stations',
        ['station_id'],
        ['id'],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('fk_menu_items_station_id_kitchen_stations', 'menu_items', type_='foreignkey')
    op.drop_column('menu_items', 'station_id')
