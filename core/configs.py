# coding: utf-8
import flask
import os
import sqlalchemy as sql
import models


app = flask.Flask(__name__)
app.config['GIFBOARD_ENV'] = os.getenv('GIFBOARD_ENV', 'local')
app.config['CLIENT_ID'] = os.getenv('IMGUR_CLIENTID', '')
app.config['CLIENT_SECRET'] = os.getenv('IMGUR_CLIENTSECRET', '')

# apply your preferred settings to be displayed in your website here
app.config['CUSTOM_WEBSITE'] = {
    'title': 'Gifboard',
}
