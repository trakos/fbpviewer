FROM node:17

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y install graphicsmagick \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*