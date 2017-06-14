#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

rm -rf var/cache/*
rm -rf web/bundles
rm -rf web/css
rm -rf web/js
docker-compose exec php bash -c "cd /var/www && composer install"
docker-compose exec php bash -c "cd /var/www/app/Resources/node_tools && npm install"
docker-compose exec php php ../bin/console assetic:dump
docker-compose exec php php ../bin/console doctrine:schema:create