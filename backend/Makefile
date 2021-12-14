all:		build

prepare:
	$(MAKE) -C .. $@

build:		prepare src/schema.json
	pnpm exec tsc --build

src/schema.json: src/schema.ts Makefile package.json
	pnpm exec ts-json-schema-generator --no-type-check --additional-properties --path $< --out $@

test:	build
	pnpm exec jest

clean:
	rm -rf build

distclean:	clean
	rm -rf node_modules

.PHONY:		all prepare build clean distclean install uninstall
