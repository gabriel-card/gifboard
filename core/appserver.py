import flask

app = flask.Flask(__name__)


@app.route("/")
def hello():
    return "ok we're running!"

if __name__ == "__main__":
    app.run()
