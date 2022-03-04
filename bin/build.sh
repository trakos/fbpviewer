#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

rm -rf var/cache/*
rm -rf web/bundles
rm -rf web/css
rm -rf web/js
rm -rf web/build
composer install
yarn install && yarn build
php bin/console cache:warmup