
build:
	npm install

configure:
	@echo 📦 Configuring npm package url for @tuuturu scope. Remember to add token
	@echo "//npm.pkg.github.com/:_authToken=<TOKEN>" >> .npmrc
	@echo "@tuuturu:registry=https://npm.pkg.github.com/tuuturu" >> .npmrc

run:
	npm run serve

clean:
	@rm -rf node_modules
