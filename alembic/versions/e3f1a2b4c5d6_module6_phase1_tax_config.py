"""Module 6 Phase 1 - Tax configuration

Revision ID: e3f1a2b4c5d6
Revises: 841712c124cd
Create Date: 2026-04-29

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = 'e3f1a2b4c5d6'
down_revision: Union[str, Sequence[str], None] = '841712c124cd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'tax_configs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('total_rate', sa.Float(), nullable=False),
        sa.Column('cgst_rate', sa.Float(), nullable=False),
        sa.Column('sgst_rate', sa.Float(), nullable=False),
        sa.Column('igst_rate', sa.Float(), nullable=False),
        sa.Column('is_igst_mode', sa.Boolean(), nullable=False),
        sa.Column('is_inclusive', sa.Boolean(), nullable=False),
        sa.Column('is_default', sa.Boolean(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name'),
    )
    op.create_index(op.f('ix_tax_configs_id'), 'tax_configs', ['id'], unique=False)

    op.add_column('categories', sa.Column('tax_config_id', sa.Integer(), nullable=True))
    op.create_foreign_key(
        'fk_categories_tax_config_id',
        'categories', 'tax_configs',
        ['tax_config_id'], ['id']
    )


def downgrade() -> None:
    op.drop_constraint('fk_categories_tax_config_id', 'categories', type_='foreignkey')
    op.drop_column('categories', 'tax_config_id')
    op.drop_index(op.f('ix_tax_configs_id'), table_name='tax_configs')
    op.drop_table('tax_configs')
