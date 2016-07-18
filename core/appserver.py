# coding: utf-8
import flask
from configs import app
from database import db_session, init_db

init_db()


@app.route("/healthcheck")
def healthcheck():
    return "OK"


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
