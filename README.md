# Gifboard
[![Build Status](https://travis-ci.org/gabriel-card/gifboard.svg?branch=master)](https://travis-ci.org/gabriel-card/gifboard)[![Coverage Status](https://coveralls.io/repos/github/gabriel-card/gifboard/badge.svg)](https://coveralls.io/github/gabriel-card/gifboard)
## About
Gifboard is a tiny project that you can upload images and gifs and visualize them in an URL as a presentation (perfect for TVs). This readme will cover all you need setup a development environment for this project. Everything else will be documented as we release 1.0.0.

## Setting up!
Follow this step-by-step guide:
- Clone this repo;
- Install `compass`;
    - `gem install compass`
- Run `make install-dev`;

## Developing
For front-end development we are using Grunt tasks to test (and coverage) and distribute js/css files. Make sure you're always running the default task for Grunt when developing. (run `grunt`).
You can run `make testserver` to run locally the project.
Make sure to always run `make test-full` before commit.
