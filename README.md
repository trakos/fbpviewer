# Factorio Blueprint Viewer (fbpviewer)

This is a simple javascript canvas viewer for factorio blueprints.

Live version available here: [http://bluetorio.tk/](http://bluetorio.tk/)


## Development

To run fbpviewer locally, you'll need docker and docker-compose.

First, create `.env` files with following 3 variables set:

```.dotenv
# Path to extracted https://factorio.com/get-download/0.15.40/alpha/linux64
FACTORIO_DIR=~/Downloads/factorio
# This will be used as web host in docker. 
NGINX_HOST=php-docker.local
NGINX_PORT=80
```

Next, you can start docker by running:

```shell
make start
```

## Production

To build production docker images, run:

```shell
make build-docker-factorio-data
make build-docker-prod-images
```

The first command requires `FACTORIO_DIR` to be set in .env and creates fbpviewer_factorio_data image.

Second command creates `fbpviewer_prod_php` and `fbpviewer_prod_nginx` images that have all
source files and assets already built and initialized.

You can test them locally using `make start-prod` that will use `docker-compose-prod.yml`.
It's similar to `make start`, but uses prebuilt images instead of mounting local directory.

To execute migrations, run `make migrate` in php container after deployment.

To push docker images you need to set `DOCKER_REGISTRY_PREFIX` in your .env file or environment:

```shell
make build-docker-prod-push
```

### Helm

There's a simple helm chart included in this repo that uses docker images built using commands above .

To use it, you need to create and fill `deployment/.values.yaml`:

```yaml
dockerRegistryCredentials:
  server: docker.example.com
  username: user
  password: password
  email: email@example.com
imagePullPolicy: Always
migrationEnabled: 1
dockerRegistryPrefix: docker.example.com/fbpviewer/ # It has to end with a slash character ("/").
nginxHost: fbpviewer.example.com
publicIp: "1.2.3.4" # optional
serviceType: "LoadBalancer"
servicePort: 80
doctrine:
  url: 'mysql://mysql:3306/dbname?serverVersion=8.0&charset=utf8mb4'
  user: dbuser
  password: dbpassword
  walletSso: ~ # Can be set to base64 encoded cwallet.sso for Oracle DB. 
replicas: 2
serviceAnnotations:
  service.beta.kubernetes.io/example: "example"
s3_backups:
  endpointUrl: 'https://s3-compatible-endpoint.example.com/'
  accessKeyId: 'accesskey'
  secretAccessKey: 'secretkey'
  cronSchedule: '0 * * * *'
mysql:
  enabled: true # You can disable it and use external database instead.
  volumePermissions:
    enabled: true
  fullnameOverride: mysql
  auth:
    rootPassword: 'rootpassword'
    username: 'dbuser'
    password: 'dbpassword'
    database: dbname
  primary:
    persistence:
      size: 1Gi
```

Then you can use helm, there are some shortcuts in makefile:
- `make helm-upgrade`
- `make helm-uninstall`

Assuming you have everything configured, subsequent deploys should involve 3 commands:

```shell
make build-docker-prod-images
make build-docker-prod-push
make helm-upgrade
```

### Backups

When using MySQL, DB backups can be stored in any s3-compatible storage provider.
They are performed automatically according to `cronSchedule` set in `deployment/.values.yaml`.
To disable backups, set `cronSchedule` to something that never happens, like "0 0 30 2 0" (30th February).

To manually perform DB backup when using helm deployment, you can use:

```shell
make kubectl-backup
```

To restore DB from the most recent backup, use:

```shell
make kubectl-restore
```

This will remove any existing data, and replace it with date from last backup.

## License

Everything that is not directly related to Factorio is MIT-licensed, as in permission is hereby granted, free of charge, 
to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to 
deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom 
the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice 
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.