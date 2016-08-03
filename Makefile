clean:
	find . -name \*pyc -delete

install:
	pip install -r requirements.txt

run: clean
	FLASK_DEBUG=0 FLASK_APP=core/appserver.py flask run

deploy-ready:
	rm -rf node_modules
	rm package.json

# dev
install-dev:
	pip install -r requirements-dev.txt
	npm install --dev

testserver: clean
	FLASK_DEBUG=1 FLASK_APP=core/appserver.py flask run

# testing
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
	npm test

test-travis: clean
	GIFBOARD_ENV=test nosetests tests \
		--nocapture \
		--with-xunit \
		--with-coverage \
		--cover-package core \
		--cover-min-percentage 70 \
		--cover-inclusive
	npm test
