#!/bin/bash

docker-compose exec node bash -c "cd /var/www/fbpviewer-js && npm install && cd /var/www/bin/fbpvatlasgen && npm install --no-bin-links && node atlasgen.js"