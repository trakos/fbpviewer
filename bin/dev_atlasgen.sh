#!/bin/bash

docker-compose exec node bash -c "cd /var/www/atlasgen && yarn install --no-bin-links && yarn run atlasgen"