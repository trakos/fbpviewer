#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"
cd ..

docker-compose exec node bash -c "cd /var/www/assets && yarn install && yarn build"