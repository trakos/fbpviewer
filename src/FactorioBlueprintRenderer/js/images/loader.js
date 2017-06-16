const forEach = require("lodash.foreach");
const merge = require("lodash.merge");
const includes = require("lodash.includes");
const PIXI = require("pixi.js");

class Loader {
    constructor(FactorioBlueprintReader) {
        this.FactorioBlueprintReader = FactorioBlueprintReader;
    }
    _prepareTrimmedTexture(imagePath, rows, cols, number) {
        if (PIXI.utils.TextureCache[imagePath + "." + number]) {
            return;
        }

        var textureWidth = PIXI.utils.TextureCache[imagePath].frame.width;
        var textureHeight = PIXI.utils.TextureCache[imagePath].frame.height;
        var w = textureWidth / cols;
        var h = textureHeight / rows;
        var row = Math.floor(number / cols);
        var col = number % cols;

        var rect = new PIXI.Rectangle(w * col, h * row, w, h);
        PIXI.utils.TextureCache[imagePath + "." + number] = new PIXI.Texture(PIXI.utils.TextureCache[imagePath].baseTexture, rect, rect.clone(), null, null);
    }
    _prepareTrimmedTexturesFromImageData(imageData) {
        var imagePath = FBR_IMAGES_PREFIX + imageData.path;
        if (imageData.type == 'trim') {
            this._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, imageData.number);
        } else if (imageData.type == 'animated' || imageData.type == 'random_trim') {
            for (var k = imageData.from; k <= imageData.to; k++) {
                this._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, k);
            }
        }
    }
    _prepareTrimmedTexturesFromEntityData(entityKey, entityData) {
        if (entityData.image.path) {
            this._prepareTrimmedTexturesFromImageData(entityData.image);
        } else if (entityData.image.type == 'container') {
            forEach(entityData.image.images, (imageData) => {
                this._prepareTrimmedTexturesFromImageData(imageData);
            });
        }
    }
    prepareTrimmedTextures() {
        var prepareTrimmedTexturesHelper = (entityData, entityKey) => {
            if (entityData.types) {
                forEach(entityData.types, function(typeSpecificEntityData) {
                    prepareTrimmedTexturesHelper(typeSpecificEntityData, entityKey);
                });

                return;
            }
            if (entityData.directions) {
                forEach(entityData.directions, (directionSpecificEntityData) => {
                    var combinedEntityData = merge({}, entityData, directionSpecificEntityData);
                    this._prepareTrimmedTexturesFromEntityData(entityKey, combinedEntityData);
                })
            }
            this._prepareTrimmedTexturesFromEntityData(entityKey, entityData);
        };

        forEach(this.FactorioBlueprintReader.entities, prepareTrimmedTexturesHelper);

        forEach(this.FactorioBlueprintReader.tiles, (entityData, entityKey) => {
            this._prepareTrimmedTexturesFromEntityData(entityKey, entityData);
        });
    }
    getImagesToLoad() {

        var imagesToLoad = [];

        function addEntityImageToLoader(entityKey, entityData) {
            if (entityData.image.path) {
                var fullPath = FBR_IMAGES_PREFIX + entityData.image.path;
                if (!includes(imagesToLoad, inArray)) {
                    imagesToLoad.push(fullPath);
                }
            } else if (entityData.image.type == 'container') {
                forEach(entityData.image.images, function (imageData) {
                    var imageFullPath = FBR_IMAGES_PREFIX + imageData.path;
                    if (!includes(imagesToLoad, imageFullPath)) {
                        imagesToLoad.push(imageFullPath);
                    }
                });
            }
        }

        forEach(this.FactorioBlueprintReader.icons, function (iconData, iconKey) {

            if (iconData.image) {
                addEntityImageToLoader(iconKey, iconData);
            }
        });

        forEach(this.FactorioBlueprintReader.entities, function (entityData, entityKey) {
            if (entityData.types) {
                forEach(entityData.types, function(typeSpecificEntityData, type) {
                    if (typeSpecificEntityData.directions) {
                        forEach(typeSpecificEntityData.directions, function (directionSpecificEntityData) {
                            var combinedEntityData = merge({}, typeSpecificEntityData, directionSpecificEntityData);
                            addEntityImageToLoader(entityKey, combinedEntityData);
                        })
                    }

                    if (typeSpecificEntityData.image) {
                        addEntityImageToLoader(entityKey, typeSpecificEntityData);
                    }
                });
            } else {
                if (entityData.directions) {
                    forEach(entityData.directions, function (directionSpecificEntityData) {
                        var combinedEntityData = merge({}, entityData, directionSpecificEntityData);
                        addEntityImageToLoader(entityKey, combinedEntityData);
                    })
                }

                if (entityData.image) {
                    addEntityImageToLoader(entityKey, entityData);
                }
            }
        });
        forEach(this.FactorioBlueprintReader.tiles, function (entityData, entityKey) {
            addEntityImageToLoader(entityKey, entityData);
        });

        forEach(this.FactorioBlueprintReader.ImagesUI, function(imageUiPath) {
           imagesToLoad.push(FBR_IMAGES_PREFIX + imageUiPath);
        });

        return imagesToLoad;
    }
}

module.exports = Loader;