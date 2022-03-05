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