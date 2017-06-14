FROM php:7-fpm

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y install zip unzip git nodejs npm \
    && apt-get clean \
    && ln -s /usr/bin/nodejs /usr/bin/node \
    && docker-php-ext-install -j$(nproc) pdo_mysql \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer