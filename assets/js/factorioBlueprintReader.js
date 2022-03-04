const forEach = require("lodash.foreach");

const { iconSize, icons } = require("./factorio/icons");
const { tiles } = require("./factorio/tiles");
const { ImagesUI } = require("./factorio/ui");
const { parse, stringify, TEST_CASES } = require("./factorio/blueprints");
const { createEntitiesFunctions } = require("./factorio/entities");

class FactorioBlueprintReader {
    constructor() {
        this.iconSize = iconSize;
        this.icons = icons;
        this.tiles = tiles;
        this.ImagesUI = ImagesUI;
        this.parse = parse;
        this.stringify = stringify;
        this.TEST_CASES = TEST_CASES;
        this.createEntitiesFunctions = createEntitiesFunctions;
    }

    loadEntities() {
        this.entities = {};

        this.createEntitiesFunctions.forEach((func) => {
            forEach(func(), (entitySpec, entityKey) => {
                this.entities[entityKey] = entitySpec;
            });
        });
    }
}

module.exports = FactorioBlueprintReader;