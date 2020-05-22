create-npmrc-file:
	@echo 📦 Configuring npm package url for @tuuturu scope
	@echo "@tuuturu:registry=http://npm.pkg.github.com/tuuturu" >> .npmrc
create-dotenv-file:
	@echo 📖 Creating .env file
	@echo "VUE_APP_BASE_URL=http://localhost:8080" >> .env
	@echo "VUE_APP_GATEKEEPER_URL=http://localhost:4554" >> .env
	@echo "VUE_APP_POST_SERVICE_URL=http://localhost:4554/api/post-service" >> .env
create-docker-compose-file:
	@echo ⚙️  Creating .activate env setter for docker compose secrets
	@echo "export GATEKEEPER_DISCOVERY_URL=" >> .activate
	@echo "export GATEKEEPER_CLIENT_ID=" >> .activate
	@echo "export GATEKEEPER_CLIENT_SECRET=" >> .activate

configure: create-npmrc-file create-dotenv-file create-docker-compose-file

run: run-dependencies
	$(eval NPM_TOKEN := $(call get-secret,d9046255-de52-40d8-8ccd-abb6008c429d))
	@NPM_TOKEN=${NPM_TOKEN} npm run serve

run-dependencies:
	$(eval NPM_TOKEN := $(call get-secret,d9046255-de52-40d8-8ccd-abb6008c429d))
	@NPM_TOKEN=${NPM_TOKEN} COMPOSE_PROJECT_NAME=motoblog docker-compose up -d

serve:
	$(eval NPM_TOKEN := $(call get-secret,d9046255-de52-40d8-8ccd-abb6008c429d))
	@NPM_TOKEN=${NPM_TOKEN} npm run serve

clean:
	@rm -rf node_modules

get-secret = $(or $(shell bw --session `cat ~/.bwsession` get password $(1)), $(error get-secret command failed))
