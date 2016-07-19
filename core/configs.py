# coding: utf-8
import flask
import os
import sqlalchemy as sql
import models


app = flask.Flask(__name__)
app.config['GIFBOARD_ENV'] = os.getenv('GIFBOARD_ENV', 'local')
app.config['CLIENT_ID'] = os.getenv('IMGUR_CLIENTID', '')
app.config['CLIENT_SECRET'] = os.getenv('IMGUR_CLIENTSECRET', '')
