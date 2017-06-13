var fs = require('fs'),
    _ = require("underscore"),
    jsdom = require("jsdom"),
    walk = require("./atlasgen/walkDirectory"),
    imagesLoader = require('./atlasgen/fbpvImagesLoader.js'),
    rimraf = require('rimraf'),
    spritesheet = require('spritesheet-js');

function loadEntities(FactorioBlueprintReader) {
    FactorioBlueprintReader.entities = {};

    _.each(FactorioBlueprintReader.createEntitiesFunctions, function (func) {
        _.each(func(), function (entitySpec, entityKey) {
            FactorioBlueprintReader.entities[entityKey] = entitySpec;
        });
    });
}

const {JSDOM} = jsdom;
const {window} = new JSDOM(`...`);

var $ = require("jquery")(window);


walk("../web/js/factorio/", function (err, results) {
    if (err) throw err;
    for (var k = 0; k < results.length; k++) {
        eval(fs.readFileSync(results[k]) + '');
    }
    loadEntities(FactorioBlueprintReader);

    rimraf('./atlasgen_output', {}, function (err) {
        if (err) {
            throw new Error(err);
        }

        imagesLoader.prepareTrimmedTextures(FactorioBlueprintReader, './atlasgen_output/images/factorio', function () {

            process.chdir('./atlasgen_output');
            spritesheet('**/*.png*', {format: 'pixi.js', fullpath: true, trim: false}, function (err) {
                if (err) throw err;

                console.log('spritesheet successfully generated');
            });

            console.log('done');
        });
    });
});