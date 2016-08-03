# coding: utf-8
from core.configs import app
from core.models import Image
from core.database import db_session
from imgurpython import ImgurClient


def upload_img_from_url(url):
    imgur_api = ImgurClient(app.config['CLIENT_ID'],
                            app.config['CLIENT_SECRET'])
    resp = imgur_api.upload_from_url(url)

    return {u'link': resp['link']}


def save_url(img_dict):
    img = Image(img_dict["link"])
    db_session.add(img)
    db_session.commit()
