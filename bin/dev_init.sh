#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

echo "Cleaning dependencies."
docker-compose exec php bash -c "rm -rf var/cache/* web/bundles web/css web/js"

echo "composer install"
docker-compose exec php bash -c "cd /var/www && composer install"

echo "npm install"
docker-compose exec php bash -c "cd /var/www/app/Resources/node_tools && npm install"

echo "assentic:dump"
docker-compose exec php php ../bin/console assetic:dump

echo "doctrine:schema:create"
docker-compose exec php php ../bin/console doctrine:schema:create
