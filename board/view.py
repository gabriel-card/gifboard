# coding: utf-8
import json
from core.database import db_session
from core.models import Image


def fetch_images():
    qs = db_session.query(Image).all()
    result = []
    for url in qs:
        result.append(url.__str__())
    return result


def jsonify_images():
    images = fetch_images()
    return json.dumps(images)
