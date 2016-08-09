# coding: utf-8
import unittest
import mock
from core.appserver import app


class RoutesTestCase(unittest.TestCase):

    def setUp(self):
        img_from_url_patcher = mock.patch('core.appserver.upload_img_from_url')
        save_url_patcher = mock.patch('core.appserver.save_url')
        self.fake_img_from_url = img_from_url_patcher.start()
        self.fake_save_url = save_url_patcher.start()
        self.app = app.test_client()
        self.addCleanup(self.fake_img_from_url.stop)
        self.addCleanup(self.fake_save_url.stop)

    def test_healthcheck(self):
        response = self.app.get('/healthcheck')
        self.assertEqual(response.status_code, 200)

    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_board(self):
        response = self.app.get('/board')
        self.assertEqual(response.status_code, 200)

    def test_post_board(self):
        response = self.app.post('/upload', data=dict(
            image_url='http://imgur.com/test.gif'
        ))
        self.fake_img_from_url.assert_called_once_with(
           'http://imgur.com/test.gif'
        )
        self.fake_save_url.assert_called_once_with(
           self.fake_img_from_url.return_value
        )

    def test_upload(self):
        response = self.app.get('/upload')
        self.assertEqual(response.status_code, 200)

    def test_image_json(self):
        response = self.app.get('/gifs.json')
        self.assertEqual(response.status_code, 200)
