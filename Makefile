.PHONY: clean build-php build-atlas build-assets build-assets-prod start stop
.ONESHELL:

clean:
	rm -rf var/cache/* rm -rf web/bundles rm -rf web/build rm -rf web/images

build-php:
	composer install
	bin/console cache:clear
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
	yarn build:prod

start:
	docker-compose up -d
	docker-compose exec -w /var/www node make build-atlas
	docker-compose exec -w /var/www node make build-assets
	docker-compose exec -w /var/www php make build-php

stop: clean
	docker-compose down -v