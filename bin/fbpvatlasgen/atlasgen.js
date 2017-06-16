var fs = require('fs'),
    _ = require("underscore"),
    jsdom = require("jsdom"),
    walk = require("./atlasgen/walkDirectory"),
    imagesLoader = require('./atlasgen/fbpvImagesLoader.js'),
    rimraf = require('rimraf'),
    spritesheet = require('spritesheet-js'),
    FactorioBlueprintReader = require("../../src/FactorioBlueprintRenderer/js/factorioBlueprintReader");

const {JSDOM} = jsdom;
const {window} = new JSDOM(`...`);

var $ = require("jquery")(window);

const factorioBlueprintReader = new FactorioBlueprintReader();

walk("../../src/AppBundle/Resources/public/js/factorio", function (err, results) {
    if (err) throw err;

    factorioBlueprintReader.loadEntities();

    rimraf('./atlasgen_output', {}, function (err) {
        if (err) {
            throw new Error(err);
        }

        imagesLoader.prepareTrimmedTextures(factorioBlueprintReader, './atlasgen_output/images/factorio', function () {

            process.chdir('./atlasgen_output');
            spritesheet('**/*.png*', {format: 'pixi.js', fullpath: true, trim: false}, function (err) {
                if (err) throw err;

                console.log('spritesheet successfully generated');
            });

            console.log('done');
        });
    });
});