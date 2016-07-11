clean:
	find . -name \*pyc -delete

install:
	pip install -r requirements.txt

testserver: clean
	FLASK_DEBUG=1 FLASK_APP=core/appserver.py flask run
