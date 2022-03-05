#!/usr/bin/env node

var fs = require('fs'),
    _ = require("underscore"),
    jsdom = require("jsdom"),
    imagesLoader = require('./atlasgen/fbpvImagesLoader.js'),
    rimraf = require('rimraf'),
    spritesheet = require('spritesheet-js'),
    FactorioBlueprintReader = require("../assets/js/factorioBlueprintReader");
const {cpSync} = require("fs");

const OUTPUT_DIR = '/tmp/atlas';
const factorioBlueprintReader = new FactorioBlueprintReader();
factorioBlueprintReader.loadEntities();

rimraf(OUTPUT_DIR, {}, function (err) {
    if (err) {
        throw new Error(err);
    }

    imagesLoader.prepareTrimmedTextures(factorioBlueprintReader, OUTPUT_DIR, function () {

        process.chdir(OUTPUT_DIR);
        spritesheet('**/*.png*', {format: 'pixi.js', fullpath: true, trim: false}, function (err) {
            if (err) throw err;

            fs.cpSync(OUTPUT_DIR, "/var/www/web/images", {recursive: true});
        });

        console.log('done');
    });
});