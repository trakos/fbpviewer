FROM php:8.1-fpm

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y --no-install-recommends install zip unzip libzip-dev libicu-dev \
    && apt-get clean \
    && docker-php-ext-install -j$(nproc) pdo_mysql \
    && docker-php-ext-install -j$(nproc) zip \
    && docker-php-ext-install -j$(nproc) intl \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN apt-get update \
    && apt-get -y --no-install-recommends install libaio-dev \
    && apt-get clean \
    && curl -o instantclient-basic-linux.x64-21.5.0.0.0dbru.zip https://download.oracle.com/otn_software/linux/instantclient/215000/instantclient-basic-linux.x64-21.5.0.0.0dbru.zip \
    && unzip instantclient-basic-linux.x64-21.5.0.0.0dbru.zip -d /usr/lib/oracle/ \
    && rm instantclient-basic-linux.x64-21.5.0.0.0dbru.zip \
    && curl -o instantclient-sdk-linux.x64-21.5.0.0.0dbru.zip https://download.oracle.com/otn_software/linux/instantclient/215000/instantclient-sdk-linux.x64-21.5.0.0.0dbru.zip \
    && unzip instantclient-sdk-linux.x64-21.5.0.0.0dbru.zip -d /usr/lib/oracle/ \
    && rm instantclient-sdk-linux.x64-21.5.0.0.0dbru.zip \
    && echo /usr/lib/oracle/instantclient_21_5 > /etc/ld.so.conf.d/oracle-instantclient.conf \
    && ldconfig \
    && docker-php-ext-configure oci8 --with-oci8=instantclient,/usr/lib/oracle/instantclient_21_5 \
    && docker-php-ext-install oci8

ENV LD_LIBRARY_PATH /usr/lib/oracle/instantclient_21_5