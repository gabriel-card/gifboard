# coding: utf-8
import unittest
from core.appserver import app
from imgurpython import ImgurClient


class ApiTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.api_client = ImgurClient()
