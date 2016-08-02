# coding: utf-8
import flask
from configs import app
from database import db_session, init_db
from models import Image
from uploader.client import upload_img_from_url
from board.view import jsonify_images

init_db()


@app.route("/")
def homepage():
    return flask.render_template("home.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/board", methods=["POST", "GET"])
def board():
    if flask.request.method == "POST":
        img_resp = upload_img_from_url(flask.request.form["image_url"])
        img = Image(img_resp["link"])
        db_session.add(img)
        db_session.commit()
    return flask.render_template("board.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/upload")
def upload():
    return flask.render_template("upload.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/gifs.json")
def gifs():
    return flask.Response(jsonify_images(), mimetype='application/json')


@app.route("/healthcheck")
def healthcheck():
    return "OK"


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
