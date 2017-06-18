#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

echo "FactorioBlueprintRenderer npm install"
docker-compose exec node bash -c "cd /var/www/src/FactorioBlueprintRenderer && npm install && npm run build"

echo "assetic:dump"
docker-compose exec php php ../bin/console assetic:dump