# syntax=docker/dockerfile:1

FROM fbpviewer_factorio_data AS factorio
FROM fbpviewer_node AS node

COPY --from=factorio /var/factorio /var/factorio
COPY assets /var/www/assets
COPY atlasgen /var/www/atlasgen
COPY web /var/www/web
COPY Makefile /var/www/Makefile
WORKDIR /var/www
RUN touch .env
RUN make build-assets-prod

FROM fbpviewer_php AS php

COPY bin /var/www/bin
COPY config /var/www/config
COPY src /var/www/src
COPY templates /var/www/templates
COPY composer.json /var/www/composer.json
COPY composer.lock /var/www/composer.lock
COPY Makefile /var/www/Makefile
COPY --from=node /var/www/web /var/www/web
WORKDIR /var/www

RUN touch .env
RUN make build-php
RUN rm /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN chown -R www-data /var/www/var

FROM fbpviewer_nginx as nginx

COPY --from=php /var/www/web /var/www/web