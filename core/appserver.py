import flask

app = flask.Flask(__name__)


@app.route("/")
def hello():
    return "ok we're running!"


@app.route("/upload")
def upload_view:
    return "upload_view"


@app.route("/tv")
def gifboard_view:
    return "gifboard_view"

if __name__ == "__main__":
    app.run()
