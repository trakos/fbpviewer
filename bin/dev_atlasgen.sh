#!/bin/bash

docker-compose run --rm node bash -c "cd fbpvatlasgen && npm install --no-bin-links && node atlasgen.js"