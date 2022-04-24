FROM bitnami/mysql:8.0.28-debian-10-r78
USER root
ENTRYPOINT []
CMD ["tail", "-f", "/dev/null"]

ADD backup.sh /backup.sh
ADD restore.sh /restore.sh

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get -y --no-install-recommends install unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm awscliv2.zip \
