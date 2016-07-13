# coding: utf-8
import flask
import os
import sqlalchemy as sql


app = flask.Flask(__name__)
app.config['GIFBOARD_ENV'] = os.getenv('GIFBOARD_ENV', 'local')
app.config["DATABASE"] = os.getenv(
    "GIFBOARD_DB_ENTRYPOINT",
    'sqlite://root:@localhost:3306/gifboard'
)

if app.config['GIFBOARD_ENV'] == 'test':
    engine = sql.create_engine('sqlite:///:memory:')
    meta = sql.MetaData(bind=engine)
    table = sql.Table('gifboard_imgs', meta,
                      sql.Column('id', sql.Integer, nullable=False,
                                 primary_key=True),
                      sql.Column('img_link', sql.String, nullable=False))
    meta.create_all(engine)
