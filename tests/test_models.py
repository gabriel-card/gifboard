import unittest
from sqlalchemy import create_engine
from core.database import db_session, Base
from core.models import Image


class ImgLinksModelTestCase(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', convert_unicode=True)
        self.session = db_session
        self.session.configure(bind=self.engine)
        Base.metadata.create_all(self.engine)

    def tearDown(self):
        self.session.remove()

    def test_create_new_object(self):
        '''Test if a new object is created passing valid URL.'''
        new_img = Image(u'http://imgur.com/img.gif')
        self.session.add(new_img)
        self.session.commit()

        self.assertIn(new_img, Image.query.all())

    def test_raises_valueerror_if_url_is_invalid(self):
        '''Test if a new object is not created passing an invalid URL,
            and if a ValueError is raised.'''
        with self.assertRaises(ValueError):
            new_img = Image(u'aeho')
            self.session.add(new_img)
            self.session.commit()
        self.assertEqual(Image.query.all(), [])  # assert that the object wasnt commited
