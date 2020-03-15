create-npmrc-file:
	@echo 📦 Configuring npm package url for @tuuturu scope. Remember to add token
	@echo "//npm.pkg.github.com/:_authToken=<TOKEN>" >> .npmrc
	@echo "@tuuturu:registry=http://npm.pkg.github.com/tuuturu" >> .npmrc
create-dotenv-file:
	@echo 📖 Creating .env file
	@echo "VUE_APP_BASE_URL=http://localhost:8080" >> .env
	@echo "VUE_APP_GATEKEEPER_URL=http://localhost:4554" >> .env
	@echo "VUE_APP_POST_SERVICE_URL=http://localhost:4554/api/post-service" >> .env

configure: create-npmrc-file create-dotenv-file

run:
	npm run serve

clean:
	@rm -rf node_modules
