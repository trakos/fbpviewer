#!/bin/bash
set -x

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

docker-compose exec php rm -rf var/cache/* web/bundles web/css web/js web/build
docker-compose exec php bash -c "cd /var/www && composer install"
docker-compose exec php bash -c "cd /var/www && bin/console cache:clear"
docker-compose exec php php ../bin/console doctrine:migrations:migrate --no-interaction
