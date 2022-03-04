FROM node:12.22

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y install graphicsmagick \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*