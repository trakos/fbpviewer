# Factorio Blueprint Viewer (fbpviewer)

This is a simple javascript canvas viewer for factorio blueprints.

Live version available here: [http://fbpviewer.trakos.pl/](http://fbpviewer.trakos.pl/)


## Development

If you want to run entire website, I recommend having docker installed. Then, you can simply run:

```
docker-compose up -d
bash bin/dev_init.sh
```

Database can be configured using environment variable DATABASE_URL.
Default is set for docker development in .env.dev and .dev.test.

You'd also have to add `php-docker.local` to your hosts file (to make it point to docker machine,
if you're using docker-machine you can find it's ip by calling `docker-machine ip`,
otherwise it's probably localhost).

You also have to have spritesheet generated. Make sure that FACTORIO_DIR is set in .env to
path of extracted https://factorio.com/get-download/0.15.40/alpha/linux64 (Factorio 0.15 install), and then
recreate docker-compose and use  `bin/dev_atlasgen.sh` to generate it yourself.

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