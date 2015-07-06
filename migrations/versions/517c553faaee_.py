"""empty message

Revision ID: 517c553faaee
Revises: 52be1beb7835
Create Date: 2015-07-06 11:42:19.825836

"""

# revision identifiers, used by Alembic.
revision = '517c553faaee'
down_revision = '52be1beb7835'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(u'question_survey_id_fkey', 'question', type_='foreignkey')
    op.drop_column('question', 'survey_id')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('question', sa.Column('survey_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key(u'question_survey_id_fkey', 'question', 'survey', ['survey_id'], ['id'])
    ### end Alembic commands ###
