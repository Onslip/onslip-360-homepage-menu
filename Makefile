all:		build

prepare:
	pnpm install

distclean::
	rm -rf node_modules

build test clean distclean::
	$(MAKE) -C backend $@

.PHONY:		all prepare build clean distclean install uninstall
