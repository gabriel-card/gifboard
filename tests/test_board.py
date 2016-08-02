import unittest
from sqlalchemy import create_engine
from core.database import db_session, Base
from core.models import Image
from board.view import fetch_images


class GifboardTestCase(unittest.TestCase):
    expected = [
        'http://imgur.com/img0.gif',
        'http://imgur.com/img1.gif',
        'http://imgur.com/img2.gif',
        'http://imgur.com/img3.gif',
        'http://imgur.com/img4.gif',
    ]

    def setUp(self):
        self.engine = create_engine('sqlite:///:memory:', convert_unicode=True)
        self.session = db_session
        self.session.configure(bind=self.engine)
        Base.metadata.create_all(self.engine)
        for i in xrange(0, 5):
            new_img = Image(u'http://imgur.com/img%s.gif' % i)
            self.session.add(new_img)
            self.session.commit()

    def tearDown(self):
        self.session.remove()

    def test_fetch_all_images_to_dict(self):
        '''Call fetch_images to fetch all images from db to a dict.'''
        images = fetch_images()
        self.assertEqual(images, self.expected)
