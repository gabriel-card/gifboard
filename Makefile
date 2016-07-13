clean:
	find . -name \*pyc -delete

install:
	pip install -r requirements-dev.txt

testserver: clean
	FLASK_DEBUG=1 FLASK_APP=core/appserver.py flask run
