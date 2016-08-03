clean:
	find . -name \*pyc -delete

install:
	pip install -r requirements.txt

run: clean
	FLASK_DEBUG=0 FLASK_APP=core/appserver.py flask run

deploy-ready:
	rm -rf node_modules
	rm -rf assets
	rm -rf tests
	rm package.json

# dev
install-dev:
	npm install --dev
	pip install -r requirements-dev.txt

testserver: clean
	FLASK_DEBUG=1 FLASK_APP=core/appserver.py flask run

# testing
test: clean
	GIFBOARD_ENV=test nosetests tests \
		--nocapture \
		--with-xunit \
		--with-coverage \
		--cover-package core \
		--cover-min-percentage 80 \
		--cover-inclusive \
		--cover-xml \
		--cover-xml-file reports/cobertura.xml
	grunt test

test-travis: clean
	GIFBOARD_ENV=test nosetests tests \
		--nocapture \
		--with-xunit \
		--with-coverage \
		--cover-package core \
		--cover-min-percentage 80 \
		--cover-inclusive
	grunt test
