# See https://github.com/casey/just to understand what is this file

run: build
	npm start

build:
	npm run build

alias b := build

