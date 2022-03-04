#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

docker-compose exec node bash -c "yarn install && yarn build"
docker-compose exec php php ../bin/console assetic:dump