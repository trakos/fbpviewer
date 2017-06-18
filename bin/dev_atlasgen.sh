#!/bin/bash

docker-compose exec node bash -c "cd /var/www/src/FactorioBlueprintRenderer && npm install && cd /var/www/bin/fbpvatlasgen && npm install --no-bin-links && node atlasgen.js"