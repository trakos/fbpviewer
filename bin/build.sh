#!/bin/bash

cd "$(dirname ${BASH_SOURCE[0]})"

rm -rf ../var/cache/*
rm -rf ../web/bundles
rm -rf ../web/css
rm -rf ../web/js
php console cache:warmup
php console assetic:dump