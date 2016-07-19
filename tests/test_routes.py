# coding: utf-8
import unittest
from core.appserver import app


class RoutesTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_healthcheck(self):
        response = self.app.get('/healthcheck')
        self.assertEqual(response.status_code, 200)

    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
