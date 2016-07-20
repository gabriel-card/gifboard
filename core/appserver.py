# coding: utf-8
import flask
from configs import app
from database import db_session, init_db

init_db()


@app.route("/")
def homepage():
    return flask.render_template("home.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/board")
def board():
    return flask.render_template("board.html",
                                 context=app.config['CUSTOM_WEBSITE'])

@app.route("/healthcheck")
def healthcheck():
    return "OK"


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
