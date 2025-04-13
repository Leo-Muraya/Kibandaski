"""Add restaurant_id to orders

Revision ID: 36abcd6cb0b8
Revises: 9bcc06270d2c
Create Date: 2025-04-13 16:13:20.891076

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '36abcd6cb0b8'
down_revision = '9bcc06270d2c'
branch_labels = None
depends_on = None


def upgrade():
    # Step 1: Add restaurant_id as nullable
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('restaurant_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_orders_restaurant_id', 'restaurants', ['restaurant_id'], ['id'])

    # Step 2 (optional): If you want to assign a default restaurant ID to old rows
    # Uncomment and update the ID if needed
    # op.execute("UPDATE orders SET restaurant_id = 1")  # Replace 1 with a valid restaurant ID

    # Step 3: Alter column to be non-nullable
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('restaurant_id', existing_type=sa.Integer(), nullable=False)


def downgrade():
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.drop_constraint('fk_orders_restaurant_id', type_='foreignkey')
        batch_op.drop_column('restaurant_id')

    op.create_table('menu_items',
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('name', sa.VARCHAR(length=100), nullable=False),
        sa.Column('price', sa.FLOAT(), nullable=False),
        sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
        sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
