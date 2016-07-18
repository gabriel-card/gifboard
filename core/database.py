# coding: utf-8
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE = os.getenv(
    "GIFBOARD_DB_ENTRYPOINT",
    'sqlite:///gifboard.db'
)

engine = create_engine(DATABASE, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db(engine=engine):
    import models
    Base.metadata.create_all(bind=engine)
