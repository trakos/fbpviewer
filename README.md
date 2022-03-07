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

The first command requires `FACTORIO_DIR` to be set and creates fbpviewer_factorio_data image.
I'd recommend pushing it somewhere and reusing it.

Second command creates `fbpviewer_prod_php` and `fbpviewer_prod_nginx` images that have all
source files and assets already built and initialized.

You can test them locally using `make start-prod` that will use `docker-compose-prod.yml` file.
It's similar to `make start`, but uses prebuilt images instead of mounting local directory.

To execute migrations, run `make migrate` after deployment.

### Environment variables

- `DATABASE_URL`, `DATABASE_USER` and `DATABASE_PASSWORD`:
  You have to set those to mysql or oracle database credentials.
- `ORACLE_CWALLET_SSO`: You can set this to base64-encoded oracle DB's cwallet.so.
  It will be un-encoded during runtime and stored in /var/www/var/cwallet.sso.
- `NGINX_HOST`: You have to set this to domain that your instance uses. 

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