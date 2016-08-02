# coding: utf-8
from core.database import db_session
from core.models import Image


def fetch_images():
    qs = db_session.query(Image).all()
    result = []
    for url in qs:
        result.append(url.__str__())
    return result
