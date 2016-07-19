# coding: utf-8
import unittest
import mock
from core.appserver import app
from uploader.client import upload_img_from_url


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

    def test_upload_image_from_url(self):
        cb = upload_img_from_url(u'http://validurl.com/image.gif')
        expected = {u'link': u'http://i.imgur.com/image.gif'}

        self.assertEqual(cb['link'], expected['link'])


# {u'account_id': 0,
#  u'account_url': None,
#  u'animated': False,
#  u'bandwidth': 0,
#  u'datetime': 1468859294,
#  u'deletehash': u'nukm7zJKb7cE8BL',
#  u'description': None,
#  u'favorite': False,
#  u'height': 400,
#  u'id': u'DpjR2bI',
#  u'in_gallery': False,
#  u'is_ad': False,
#  u'link': u'http://i.imgur.com/DpjR2bI.jpg',
#  u'name': u'',
#  u'nsfw': None,
#  u'section': None,
#  u'size': 22873,
#  u'title': None,
#  u'type': u'image/jpeg',
#  u'views': 0,
#  u'vote': None,
#  u'width': 400}
