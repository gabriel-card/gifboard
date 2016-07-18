# coding: utf-8
import flask
import os
import sqlalchemy as sql
import models


app = flask.Flask(__name__)
app.config['GIFBOARD_ENV'] = os.getenv('GIFBOARD_ENV', 'local')
