# coding: utf-8
import unittest
import mock
from sqlalchemy import create_engine
from uploader.client import upload_img_from_url, save_url, normalize_url
from core.appserver import app
from core.database import db_session, Base
from core.models import Image


class FakeImgurClient(object):
    def upload_from_url(self, x):
        return {u'link': u'http://i.imgur.com/image.gif'}


class ApiTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        client_patcher = mock.patch('uploader.client.ImgurClient')
        self.fake_client = client_patcher.start()
        fake_client_obj = FakeImgurClient()
        self.fake_client.return_value = fake_client_obj
        self.addCleanup(self.fake_client.stop)
        self.engine = create_engine('sqlite:///:memory:', convert_unicode=True)
        self.session = db_session
        self.session.configure(bind=self.engine)
        Base.metadata.create_all(self.engine)

    def tearDown(self):
        self.session.remove()

    def test_upload_image_from_url(self):
        '''Should return dict with uploaded image url.'''
        cb = upload_img_from_url(u'http://validurl.com/image.gif')
        expected = {u'link': u'https://i.imgur.com/image.gif'}

        self.assertEqual(cb['link'], expected['link'])

    def test_save_imgurl_to_db(self):
        '''Should save image url to db received from form.'''
        image_resp = {u'link': u'http://i.imgur.com/image.gif'}
        expected = Image(image_resp['link'])
        expected = expected.link

        save_url(image_resp)
        url = Image.query.all()[0].link.url

        self.assertIn(expected, url)

    def test_normalize_url(self):
        '''Should return an image url with HTTPS protocol'''
        image_url = u'http://i.imgur.com/image.gif'
        expected = 'https://i.imgur.com/image.gif'

        normalized_url = normalize_url(image_url)

        self.assertEqual(normalized_url, expected)
