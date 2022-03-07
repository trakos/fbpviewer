include .env
MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(dir $(MAKEFILE_PATH))

.PHONY: clean build-php migrate build-atlas build-assets build-assets-prod start stop build-docker-factorio-data build-docker-prod-images start-prod stop-prod
.ONESHELL:

clean:
	rm -rf var/cache/* rm -rf web/bundles rm -rf web/build rm -rf web/images

build-php:
	composer install
	bin/console cache:warmup

migrate:
	bin/console doctrine:migrations:migrate --no-interaction

build-atlas:
	cd /var/www/atlasgen
	yarn install --no-bin-links
	yarn run atlasgen

build-assets:
	cd /var/www/assets
	yarn install
	yarn build

build-assets-prod:
	cd /var/www/assets
	yarn install
	env NODE_ENV=production yarn build
	# Remove source assets that are loaded from spritesheet.png/spritesheet.json on production.
	rm -fr /var/www/web/images/base
	rm -fr /var/www/web/images/core
	rm -fr /var/www/web/images/background.png

start:
	docker-compose up -d
	docker-compose exec -w /var/www node make build-assets
	docker-compose exec -w /var/www node make build-atlas
	docker-compose exec -w /var/www php make build-php
	docker-compose exec -w /var/www php make migrate

stop: clean
	docker-compose down -v

build-docker-factorio-data:
	cd ${FACTORIO_DIR}
	docker build -f ${CURRENT_DIR}/deployment/docker/factorio_data/Dockerfile . -t fbpviewer_factorio_data

build-docker-prod-images:
    # Make sure that you've built image fbpviewer_factorio_data first.
    # You can use factorio-data for that.
	docker build deployment/docker/php -t fbpviewer_php
	docker build deployment/docker/node -t fbpviewer_node
	docker build deployment/docker/nginx -t fbpviewer_nginx
	docker build --target php -f deployment/docker/prod/Dockerfile . -t fbpviewer_prod_php
	docker build --target nginx -f deployment/docker/prod/Dockerfile . -t fbpviewer_prod_nginx

# This allows testing production images in docker-compose.
start-prod:
	docker-compose -f docker-compose-prod.yml run --rm wait_for_mysql
	docker-compose -f docker-compose-prod.yml up -d
	docker-compose -f docker-compose-prod.yml exec -w /var/www php make migrate

stop-prod:
	docker-compose -f docker-compose-prod.yml down