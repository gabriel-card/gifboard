# coding: utf-8
from core.configs import app
from imgurpython import ImgurClient


def upload_img_from_url(url):
    imgur_api = ImgurClient(app.config['CLIENT_ID'],
                            app.config['CLIENT_SECRET'])
    resp = imgur_api.upload_from_url(url)

    return {u'link': resp['link']}
