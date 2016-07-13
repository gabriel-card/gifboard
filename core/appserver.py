# coding: utf-8
import flask
from configs import app


@app.route("/healthcheck")
def healthcheck():
    return "OK"
