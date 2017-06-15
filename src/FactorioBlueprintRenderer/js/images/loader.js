const $ = require("jquery");
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
        var that = this;

        if (entityData.image.path) {
            this._prepareTrimmedTexturesFromImageData(entityData.image);
        } else if (entityData.image.type == 'container') {
            $.each(entityData.image.images, function (imageKey, imageData) {
                that._prepareTrimmedTexturesFromImageData(imageData);
            });
        }
    }
    prepareTrimmedTextures() {
        var that = this;

        var prepareTrimmedTexturesHelper = function (entityKey, entityData) {
            if (entityData.types) {
                $.each(entityData.types, function(type, typeSpecificEntityData) {
                    prepareTrimmedTexturesHelper(entityKey, typeSpecificEntityData);
                });

                return;
            }
            if (entityData.directions) {
                $.each(entityData.directions, function (direction, directionSpecificEntityData) {
                    var combinedEntityData = $.extend({}, entityData, directionSpecificEntityData);
                    that._prepareTrimmedTexturesFromEntityData(entityKey, combinedEntityData);
                })
            }
            that._prepareTrimmedTexturesFromEntityData(entityKey, entityData);
        };

        $.each(this.FactorioBlueprintReader.entities, prepareTrimmedTexturesHelper);

        $.each(this.FactorioBlueprintReader.tiles, function (entityKey, entityData) {
            that._prepareTrimmedTexturesFromEntityData(entityKey, entityData);
        });
    }
    getImagesToLoad() {

        var imagesToLoad = [];

        function addEntityImageToLoader(entityKey, entityData) {
            if (entityData.image.path) {
                var fullPath = FBR_IMAGES_PREFIX + entityData.image.path;
                if ($.inArray(fullPath, imagesToLoad) < 0) {
                    imagesToLoad.push(fullPath);
                }
            } else if (entityData.image.type == 'container') {
                $.each(entityData.image.images, function (imageKey, imageData) {
                    var imageFullPath = FBR_IMAGES_PREFIX + imageData.path;
                    if ($.inArray(imageFullPath, imagesToLoad) < 0) {
                        imagesToLoad.push(imageFullPath);
                    }
                });
            }
        }

        $.each(this.FactorioBlueprintReader.icons, function (iconKey, iconData) {

            if (iconData.image) {
                addEntityImageToLoader(iconKey, iconData);
            }
        });

        $.each(this.FactorioBlueprintReader.entities, function (entityKey, entityData) {
            if (entityData.types) {
                $.each(entityData.types, function(type, typeSpecificEntityData) {
                    if (typeSpecificEntityData.directions) {
                        $.each(typeSpecificEntityData.directions, function (direction, directionSpecificEntityData) {
                            var combinedEntityData = $.extend({}, typeSpecificEntityData, directionSpecificEntityData);
                            addEntityImageToLoader(entityKey, combinedEntityData);
                        })
                    }

                    if (typeSpecificEntityData.image) {
                        addEntityImageToLoader(entityKey, typeSpecificEntityData);
                    }
                });
            } else {
                if (entityData.directions) {
                    $.each(entityData.directions, function (direction, directionSpecificEntityData) {
                        var combinedEntityData = $.extend({}, entityData, directionSpecificEntityData);
                        addEntityImageToLoader(entityKey, combinedEntityData);
                    })
                }

                if (entityData.image) {
                    addEntityImageToLoader(entityKey, entityData);
                }
            }
        });
        $.each(this.FactorioBlueprintReader.tiles, function (entityKey, entityData) {
            addEntityImageToLoader(entityKey, entityData);
        });

        $.each(this.FactorioBlueprintReader.ImagesUI, function(imageUiName, imageUiPath) {
           imagesToLoad.push(FBR_IMAGES_PREFIX + imageUiPath);
        });

        return imagesToLoad;
    }
}

module.exports = Loader;