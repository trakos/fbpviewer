#!/bin/bash

docker-compose exec node bash -c "cd /var/www/bin/fbpvatlasgen && yarn install --no-bin-links && yarn run atlasgen"