var fs = require('fs'),
    path = require('path'),
    _ = require("underscore"),
    gm = require('gm'),
    mkdirp = require('mkdirp');

const FBR_IMAGES_PREFIX = "../web/images/factorio/";

module.exports = {
    _alreadyLoaded:                        {},
    _outputDir:                            '',
    _prepareTrimmedTexture:                function (imagePath, rows, cols, number, callback) {
        if (this._alreadyLoaded[imagePath + "." + number]) {
            callback();

            return;
        }

        this._alreadyLoaded[imagePath + "." + number] = 1;
        var destinationPath = this._outputDir + '/' + imagePath + "." + number;
        mkdirp(path.dirname(destinationPath), function (err) {
            if (err) {
                callback(err);
                return;
            }

            gm(FBR_IMAGES_PREFIX + imagePath).size(function (err, size) {
                if (err) {
                    callback(err);
                    return;
                }
                var textureWidth = size.width;
                var textureHeight = size.height;
                var w = textureWidth / cols;
                var h = textureHeight / rows;
                var row = Math.floor(number / cols);
                var col = number % cols;
                gm(FBR_IMAGES_PREFIX + imagePath)
                    .crop(w, h, w * col, h * row)
                    .write(destinationPath, function (err) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        //console.log(imagePath + "." + number);
                        callback();
                    });
            });
        });
    },
    _prepareSpriteTexture:                 function (imagePath, callback) {
        if (this._alreadyLoaded[imagePath]) {
            callback();

            return;
        }

        var destinationPath = this._outputDir + '/' + imagePath;

        mkdirp(path.dirname(destinationPath), function (err) {
            if (err) {
                callback(err);
                return;
            }

            gm(FBR_IMAGES_PREFIX + imagePath)
                .write(destinationPath, function (err) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    //console.log(imagePath);
                    callback();
                });
        });
    },
    _prepareTrimmedTexturesFromImageData:  function (imageData, callback) {
        var imagePath = imageData.path;
        var that = this;
        if (imageData.type === 'trim') {
            this._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, imageData.number, callback);
        } else if (imageData.type === 'animated' || imageData.type === 'random_trim') {

            function next(k) {
                if (k > imageData.to) {
                    callback();
                } else {
                    that._prepareTrimmedTexture(imagePath, imageData.rows, imageData.cols, k, function (err) {
                        if (err) {
                            callback(err);
                            return;
                        }

                        next(k + 1);
                    });
                }
            }

            next(imageData.from);
        } else if (imageData.type === 'sprite') {
            this._prepareSpriteTexture(imagePath, callback);
        } else {
            callback('unknown image type' + imageData.type);
        }
    },
    _prepareTrimmedTexturesFromEntityData: function (entityData, callback) {
        var that = this;

        if (!entityData || !entityData.image) {
            console.log(entityData);
            callback('No image');
        }
        if (entityData.image.path) {
            this._prepareTrimmedTexturesFromImageData(entityData.image, callback);
        } else if (entityData.image.type === 'container') {
            function next(k) {
                if (k >= entityData.image.images.length) {
                    callback();
                } else {
                    var imageData = entityData.image.images[k];
                    that._prepareTrimmedTexturesFromImageData(imageData, function (err) {
                        if (err) {
                            callback(err);
                            return;
                        }

                        next(k + 1);
                    });
                }
            }

            next(0);
        }
    },
    prepareTrimmedTextures:                function (FactorioBlueprintReader, outputDir, finalCallback) {
        var that = this;

        this._outputDir = outputDir;

        var isFinishedAddingTasks = false;
        var tasksAdded = 0;
        var tasksDone = 0;

        function callback(err) {
            if (err) {
                throw new Error(err);
            }
            tasksDone++;
            console.log(tasksDone + '/' + tasksAdded);
            if (isFinishedAddingTasks && tasksDone >= tasksAdded) {
                finalCallback();
            }
        }

        var prepareTrimmedTexturesHelper = function (entityData) {
            if (entityData.types) {
                _.each(entityData.types, function (typeSpecificEntityData) {
                    prepareTrimmedTexturesHelper(typeSpecificEntityData);
                });

                return;
            }
            if (entityData.directions) {
                _.each(entityData.directions, function (directionSpecificEntityData) {
                    var combinedEntityData = _.extend({}, entityData, directionSpecificEntityData);
                    tasksAdded++;
                    that._prepareTrimmedTexturesFromEntityData(combinedEntityData, callback);
                })
            }
            tasksAdded++;
            that._prepareTrimmedTexturesFromEntityData(entityData, callback);
        };

        mkdirp(outputDir, function(err) {
            if (err) {
                throw new Error(err);
            }

            _.each(FactorioBlueprintReader.entities, prepareTrimmedTexturesHelper);
            console.log('Entities tasks added');

            _.each(FactorioBlueprintReader.tiles, function (entityData) {
                tasksAdded++;
                that._prepareTrimmedTexturesFromEntityData(entityData, callback);
            });
            console.log('Tiles tasks added');

            _.each(FactorioBlueprintReader.ImagesUI, function (imageUiPath) {
                tasksAdded++;
                that._prepareSpriteTexture(imageUiPath, callback);
            });
            console.log('UI tasks added');

            _.each(FactorioBlueprintReader.icons, function (iconData) {
                tasksAdded++;
                that._prepareTrimmedTexturesFromEntityData(iconData, callback);
            });
            console.log('Icon tasks added');
            isFinishedAddingTasks = true;

        });
    }
};