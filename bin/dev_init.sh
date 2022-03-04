#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

echo "Cleaning dependencies."
docker-compose exec php rm -rf var/cache/* web/bundles web/css web/js web/build

echo "composer install"
docker-compose exec php bash -c "cd /var/www && composer install"

echo "doctrine:schema:create"
docker-compose exec php php ../bin/console doctrine:schema:create
