#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

rm -rf var/cache/*
rm -rf web/bundles
rm -rf web/css
rm -rf web/js
rm -rf web/build
composer install
(cd assets && yarn install && yarn build)
php bin/console cache:clear
php bin/console cache:warmup
php bin/console doctrine:migrations:migrate --no-interaction