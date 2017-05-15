var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.Loader = {
    _prepareTrimmedTexture:                function (imagePath, rows, cols, number) {
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
    },
    _prepareTrimmedTexturesFromImageData:  function (imageData) {
        var imagePath = IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + imageData.path;
        if (imageData.type == 'trim') {
            this._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, imageData.number);
        } else if (imageData.type == 'animated') {
            for (var k = imageData.from; k <= imageData.to; k++) {
                this._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, k);
            }
        }
    },
    _prepareTrimmedTexturesFromEntityData: function (entityKey, entityData) {
        var that = this;

        if (entityData.image.path) {
            this._prepareTrimmedTexturesFromImageData(entityData.image);
        } else if (entityData.image.type == 'container') {
            $.each(entityData.image.images, function (imageKey, imageData) {
                that._prepareTrimmedTexturesFromImageData(imageData);
            });
        }
    },
    prepareTrimmedTextures:                function () {
        var that = this;

        $.each(FactorioBlueprintReader.entities.ENTITIES, function (entityKey, entityData) {
            if (entityData.directions) {
                $.each(entityData.directions, function (direction, directionSpecificEntityData) {
                    var combinedEntityData = $.extend({}, entityData, directionSpecificEntityData);
                    that._prepareTrimmedTexturesFromEntityData(entityKey, combinedEntityData);
                })
            }
            that._prepareTrimmedTexturesFromEntityData(entityKey, entityData);
        });
    },
    getImagesToLoad: function() {
        var imagesToLoad = [];

        $.each(FactorioBlueprintReader.icons.ICONS, function (key, iconPath) {
            imagesToLoad.push(IMAGES_PREFIX + FactorioBlueprintReader.icons.prefix + iconPath);
        });

        function addEntityImageToLoader(entityKey, entityData) {
            if (entityData.image.path) {
                var fullPath = IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityData.image.path;
                if ($.inArray(fullPath, imagesToLoad) < 0) {
                    imagesToLoad.push(fullPath);
                }
            } else if (entityData.image.type == 'container') {
                $.each(entityData.image.images, function (imageKey, imageData) {
                    var imageFullPath = IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + imageData.path;
                    if ($.inArray(imageFullPath, imagesToLoad) < 0) {
                        imagesToLoad.push(imageFullPath);
                    }
                });
            }
        }

        $.each(FactorioBlueprintReader.entities.ENTITIES, function (entityKey, entityData) {
            if (entityData.directions) {
                $.each(entityData.directions, function (direction, directionSpecificEntityData) {
                    var combinedEntityData = $.extend({}, entityData, directionSpecificEntityData);
                    addEntityImageToLoader(entityKey, combinedEntityData);
                })
            }

            addEntityImageToLoader(entityKey, entityData);
        });

        imagesToLoad.push(IMAGES_PREFIX + "terrain/concrete/concrete4.png");
        imagesToLoad.push(IMAGES_PREFIX + "core/entity-info-dark-background.png");

        return imagesToLoad;
    }
};