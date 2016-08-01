import unittest
from sqlalchemy import create_engine
from core.database import db_session, Base
from core.models import Image


class GifboardTestCase(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', convert_unicode=True)
        self.session = db_session
        self.session.configure(bind=self.engine)
        Base.metadata.create_all(self.engine)

    def tearDown(self):
        self.session.remove()
