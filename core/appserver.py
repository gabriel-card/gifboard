# coding: utf-8
import flask
from configs import app
from database import db_session, init_db
from models import Image
from uploader.client import upload_img_from_url, save_url
from board.view import jsonify_images

init_db()


@app.route("/")
def homepage():
    return flask.render_template("home.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/board", methods=["POST", "GET"])
def board():
    return flask.render_template("board.html",
                                 context=app.config['CUSTOM_WEBSITE'])


@app.route("/upload", methods=["POST", "GET"])
def upload():
    if flask.request.method == "POST":
        img_resp = upload_img_from_url(flask.request.form["image_url"])
        save_url(img_resp)
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
