clean:
	find . -name \*pyc -delete

install-local:
	pip install -r requirements-dev.txt

testserver: clean
	FLASK_DEBUG=1 FLASK_APP=core/appserver.py flask run

test: clean
	GIFBOARD_ENV=test nosetests tests \
		--nocapture \
		--with-xunit \
		--with-coverage \
		--cover-package core \
		--cover-min-percentage 70 \
		--cover-inclusive \
		--cover-xml \
		--cover-xml-file reports/cobertura.xml
