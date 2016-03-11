PACKAGER=./app/node_modules/.bin/electron-packager
DEFAULT_CMD=$(PACKAGER) ./app YAM --arch=all --version=0.36.11 --out=./build --asar=true --name=YAM

.PHONY: run build

run:
	electron ./app/main.js

build: build_darwin build_win32 build_linux

build_darwin:
	@$(DEFAULT_CMD) --platform=darwin --icon=./app/icons/source_colored.icns

build_win32:
	@$(DEFAULT_CMD) --platform=win32 # --icon=./app/icons/source_colored.ico # requires wine

build_linux:
	@$(DEFAULT_CMD) --platform=linux --icon=./app/icons/source_colored_png/128x128.png
