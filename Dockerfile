### Dependency stage
FROM node:lts-alpine AS dep-stage
ARG NPM_TOKEN

WORKDIR /build

COPY package*.json ./
COPY .npmrc ./

RUN npm ci

### Build stage
FROM node:lts-alpine AS build-stage

WORKDIR /build

COPY --from=dep-stage /build/node_modules ./node_modules

COPY .eslintrc.js .
COPY .eslintignore .
COPY .prettierrc.yaml .
COPY babel.config.js .
COPY package*.json ./

COPY public/ ./public
COPY src/ ./src
COPY scripts/ ./scripts

RUN npm run build

### Run
FROM nginx:stable-alpine AS production-stage

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
	ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["entrypoint.sh"]

COPY --from=build-stage /build/scripts/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

COPY --from=build-stage /build/dist /usr/share/nginx/html

EXPOSE 80
