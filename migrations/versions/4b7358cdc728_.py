"""empty message

Revision ID: 4b7358cdc728
Revises: 517c553faaee
Create Date: 2015-07-06 11:46:19.346140

"""

# revision identifiers, used by Alembic.
revision = '4b7358cdc728'
down_revision = '517c553faaee'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('question', sa.Column('survey_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'question', 'survey', ['survey_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'question', type_='foreignkey')
    op.drop_column('question', 'survey_id')
    ### end Alembic commands ###
