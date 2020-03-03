build:
	npm install

create-npmrc-file:
	@echo 📦 Configuring npm package url for @tuuturu scope. Remember to add token
	@echo "//npm.pkg.github.com/:_authToken=<TOKEN>" >> .npmrc
	@echo "@tuuturu:registry=https://npm.pkg.github.com/tuuturu" >> .npmrc
create-dotenv-file:
	@echo 📖 Creating .env file
	@echo "VUE_APP_POST_SERVICE_URL=http://localhost:3000" >> .env

configure: create-npmrc-file create-dotenv-file

run:
	npm run serve

clean:
	@rm -rf node_modules
