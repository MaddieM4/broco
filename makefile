# For optimized demo build

.PHONY: _optimized

PATH_TO_RJS := http://requirejs.org/docs/release/2.1.15/r.js

all: _optimized
	echo "All things built"

_optimized: r.js
	rm -rf optimized
	mkdir optimized
	cp index.html optimized
	cp -r src optimized/src
	node r.js -o build.js

r.js:
	wget $(PATH_TO_RJS)
