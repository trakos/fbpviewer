var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.renderBlueprint = (function () {

    FactorioBlueprintReader.animationHandler.clear();

    const DEFAULT_LAYER = 100;
    const OVERLAY_LAYER = 200;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function hashTwoIntegers(a, b) {
        var A = a >= 0 ? 2 * a : -2 * a - 1;
        var B = b >= 0 ? 2 * b : -2 * b - 1;
        var C = (A >= B ? A * A + A + B : A + B * B) / 2;
        return a < 0 && b < 0 || a >= 0 && b >= 0 ? C : -C - 1;
    }

    function getEntityDrawingSpecForEntity(entity) {
        var entityDrawingSpec = FactorioBlueprintReader.entities[entity.name];
        if (!entityDrawingSpec) {
            return null;
        }
        if (entity.type && entityDrawingSpec.types) {
            entityDrawingSpec = $.extend({}, entityDrawingSpec, entityDrawingSpec.types[entity.type]);
        }
        if (entity.direction && entityDrawingSpec.directions && entityDrawingSpec.directions[entity.direction]) {
            entityDrawingSpec = $.extend({}, entityDrawingSpec, entityDrawingSpec.directions[entity.direction]);
        }

        return entityDrawingSpec;
    }

    function createEntityLayers(entityImageSpec, entitySpec) {
        var layerSprites = {};

        if (entityImageSpec.type == 'sprite') {
            layerSprites[entityImageSpec.layer || DEFAULT_LAYER] = new PIXI.Sprite(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path]);
        } else if (entityImageSpec.type == 'trim') {
            layerSprites[entityImageSpec.layer || DEFAULT_LAYER] = new PIXI.Sprite(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + entityImageSpec.number]);
        } else if (entityImageSpec.type == 'random_trim') {
            var number = getRandomInt(entityImageSpec.from, entityImageSpec.to);
            layerSprites[entityImageSpec.layer || DEFAULT_LAYER] = new PIXI.Sprite(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + number]);
        } else if (entityImageSpec.type == 'animated') {
            var frames = [];
            for (var i = entityImageSpec.from; i <= entityImageSpec.to; i++) {
                frames.push(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + i]);
            }
            if (entityImageSpec.reverse) {
                for (var j = entityImageSpec.to; j >= entityImageSpec.from; j--) {
                    frames.push(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + j]);
                }
            }
            var sprite = new PIXI.extras.AnimatedSprite(frames);
            sprite.animationSpeed = entityImageSpec.animationSpeed || 1;
            sprite.play();
            layerSprites[entityImageSpec.layer || DEFAULT_LAYER] = sprite;
        } else if (entityImageSpec.type == 'container') {
            for (var imageKey in entityImageSpec.images) {
                if (entityImageSpec.images.hasOwnProperty(imageKey)) {
                    var entityLayers = createEntityLayers(entityImageSpec.images[imageKey], entitySpec);
                    $.each(entityLayers, function (layer, entityLayer) {
                        entityLayer.x = entityImageSpec.images[imageKey].x;
                        entityLayer.y = entityImageSpec.images[imageKey].y;
                        layerSprites[layer] = layerSprites[layer] || new PIXI.Container();
                        layerSprites[layer].addChild(entityLayer);
                    });
                }
            }
        } else {
            throw 'unknown type ' + entityImageSpec.type;
        }

        $.each(layerSprites, function (layerNumber, layerSprite) {
            if (entityImageSpec.scale) {
                layerSprite.scale.x = entityImageSpec.scale.x;
                layerSprite.scale.y = entityImageSpec.scale.y;
            }

            if (entityImageSpec.anchor) {
                layerSprite.anchor.x = entityImageSpec.anchor.x;
                layerSprite.anchor.y = entityImageSpec.anchor.y;
            }

            if (entityImageSpec.rotation) {
                layerSprite.anchor.set(0.5, 0.5);
                layerSprite.rotation = entityImageSpec.rotation * Math.PI;
            }

            if (entityImageSpec.alpha) {
                layerSprite.alpha = entityImageSpec.alpha;
            }

            if (entityImageSpec.mask) {
                var color = 0xFF0000;
                var alpha = 0.5;
                if (entitySpec && entitySpec.color) {
                    color = ((entitySpec.color.r * 255) << 16) + ((entitySpec.color.g * 255) << 8) + (entitySpec.color.b * 255);
                    alpha = entitySpec.color.a;
                }
                layerSprite.filters = [new ColorFillShader(color)];
                layerSprite.alpha = alpha;
            }
        });

        return layerSprites;
    }

    function drawLayers(destinationLayers, sourceLayers, gridX, gridY, xOffset, yOffset) {
        $.each(sourceLayers, function (layerNumber, spriteLayer) {
            spriteLayer.x = gridX * FBR_PIXELS_PER_TILE + xOffset;
            spriteLayer.y = gridY * FBR_PIXELS_PER_TILE + yOffset;
            destinationLayers[layerNumber] = destinationLayers[layerNumber] || new PIXI.Container();
            destinationLayers[layerNumber].addChild(spriteLayer);
        });
    }

    function createIconSprite(imageSpec) {
        var iconLayers = createEntityLayers(imageSpec);
        var darkBackground = new PIXI.Sprite(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + FactorioBlueprintReader.ImagesUI.INFO_DARK_BACKGROUND]);
        darkBackground.anchor.x = 0.5;
        darkBackground.anchor.y = 0.5;
        iconLayers[OVERLAY_LAYER - 10] = darkBackground;

        return iconLayers;
    }

    function renderEntityToLayers(layers, minXY, entity) {
        var spriteLayers = {};
        var sizeW = 0;
        var sizeH = 0;
        var xOffset = 0;
        var yOffset = 0;
        var entityDrawingSpec = getEntityDrawingSpecForEntity(entity);
        if (!entityDrawingSpec) {
            console.log("Unknown entity name", entity.name);
            var sprite = new PIXI.Graphics();
            sprite.beginFill(0xFFFFFF);
            sprite.lineStyle(1, 0x000000);
            sprite.drawRect(0, 0, FBR_PIXELS_PER_TILE, FBR_PIXELS_PER_TILE);
            spriteLayers[DEFAULT_LAYER] = sprite;
            sizeW = 1;
            sizeH = 1;
            xOffset = 0;
            yOffset = 0;
        } else {
            spriteLayers = createEntityLayers(entityDrawingSpec.image, entity);
            sizeW = entityDrawingSpec.gridSize.w;
            sizeH = entityDrawingSpec.gridSize.h;
            xOffset = entityDrawingSpec.offset.x;
            yOffset = entityDrawingSpec.offset.y;
        }

        var gridX = Math.floor(entity.position.x - minXY - sizeW / 2);
        var gridY = Math.floor(entity.position.y - minXY - sizeH / 2);
        drawLayers(layers, spriteLayers, gridX, gridY, xOffset, yOffset);


        if (entity.recipe) {
            if (!FactorioBlueprintReader.icons[entity.recipe]) {
                console.log('Can\'t find icon for recipe', entity.recipe);
            } else {
                var iconLayers = createIconSprite(FactorioBlueprintReader.icons[entity.recipe].image);
                xOffset = (sizeW * FBR_PIXELS_PER_TILE) / 2;
                yOffset = (sizeH * FBR_PIXELS_PER_TILE) / 2;
                drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
            }
        }

        if (entity.items) {
            var itemCount = 0;
            $.each(entity.items, function (_, entityItem) {
                // apparently items can be an array or an object
                // i.e. either [{name: 'blabla', count:5}] or just {blabla:5}
                itemCount += entityItem.count ? entityItem.count : entityItem;
            });
            var startX = (sizeW * FBR_PIXELS_PER_TILE - itemCount * FactorioBlueprintReader.iconSize / 2) / 2;
            // add another half of icon size (which is uses scale 0.5, so a quarter of size) due to anchor being 0.5
            startX += FactorioBlueprintReader.iconSize / 4;
            var itemNumber = 0;
            $.each(entity.items, function (itemName, entityItem) {
                // apparently items can be an array or an object
                // i.e. either [{name: 'blabla', count:5}] or just {blabla:5}
                var count = entityItem;
                if (entityItem.item) {
                    itemName = entityItem.item;
                    count = entityItem.count;
                }
                for (var k = 0; k < count; k++) {
                    if (!FactorioBlueprintReader.icons[itemName]) {
                        console.log('Can\'t find icon for item', itemName);
                    } else {
                        var iconLayers = createIconSprite(FactorioBlueprintReader.icons[itemName].image);
                        $.each(iconLayers, function (layerNumber, layerContainer) {
                            layerContainer.scale.x = layerContainer.scale.y = 0.5;
                        });
                        xOffset = startX + FactorioBlueprintReader.iconSize / 2 * itemNumber;
                        yOffset = (sizeH * FBR_PIXELS_PER_TILE) / 2 + FactorioBlueprintReader.iconSize;
                        drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
                    }
                    itemNumber++;
                }
            });
        }

        var filters = [];
        if (entity.filters) {
            filters = entity.filters;
        } else if (entity.request_filters) {
            filters = entity.request_filters;
        }
        var filterItemNumber = 0;
        $.each(filters, function (_, filterItem) {
            if (!FactorioBlueprintReader.icons[filterItem.name]) {
                console.log('Can\'t find icon for item', filterItem.name);
            } else {
                var iconLayers = createIconSprite(FactorioBlueprintReader.icons[filterItem.name].image);
                $.each(iconLayers, function (layerNumber, layerContainer) {
                    layerContainer.scale.x = layerContainer.scale.y = 0.4;
                });
                xOffset = (filterItemNumber % 2 == 0 ? 0 : 16) + (FactorioBlueprintReader.iconSize * 0.2);
                yOffset = (Math.floor(filterItemNumber % 4 / 2) * 16) + (FactorioBlueprintReader.iconSize * 0.2);
                drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
                // if there's more than 4, cycle between them every 2 seconds; also hide if alt is pressed
                var everyNSeconds = 5;
                var currentFilterItemNumber = filterItemNumber;
                FactorioBlueprintReader.animationHandler.addOnSecondTickListener(function (second) {
                    $.each(iconLayers, function (layerNumber, layerContainer) {
                        var altPressed = FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.alt);
                        layerContainer.visible = (!altPressed) && Math.floor(second / everyNSeconds) % (Math.ceil(filters.length / 4)) == Math.floor(currentFilterItemNumber / 4);
                    });
                });
            }
            filterItemNumber++;
        });

    }


    return function (stage, blueprintData) {
        var entities = blueprintData.blueprint.entities || [];
        var tiles = blueprintData.blueprint.tiles || [];

        var minXY = 0;
        var maxXY = 0;

        $.each(tiles, function (key, entity) {
            var x = entity.position.x;
            var y = entity.position.y;
            minXY = Math.min(minXY, x, y);
            maxXY = Math.max(maxXY, x, y);
        });

        var entitiesByYX = {};
        var allYCoordinates = [];
        $.each(entities, function (key, entity) {
            var x = parseInt(entity.position.x);
            var y = parseInt(entity.position.y);

            entitiesByYX[y] = entitiesByYX[y] || {};
            entitiesByYX[y][x] = entitiesByYX[y][x] || [];
            entitiesByYX[y][x].push(key);

            if (allYCoordinates.indexOf(y) === -1) {
                allYCoordinates.push(y);
            }

            minXY = Math.min(minXY, x, y);
            maxXY = Math.max(maxXY, x, y);
        });
        allYCoordinates.sort(function (a, b) {
            return a - b;
        });

        minXY -= 5;
        maxXY += 5;

        var sizeXY = maxXY - minXY;
        var minScale = Math.min(1, FBR_CANVAS_WIDTH / (sizeXY * FBR_PIXELS_PER_TILE), FBR_CANVAS_HEIGHT / (sizeXY * FBR_PIXELS_PER_TILE));

        var blueprintContainer = new PIXI.Container();
        blueprintContainer.scale.x = blueprintContainer.scale.y = minScale;

        var background = new PIXI.extras.TilingSprite(PIXI.loader.resources[FBR_IMAGES_PREFIX + FactorioBlueprintReader.ImagesUI.BACKGROUND].texture, FBR_CANVAS_WIDTH / minScale, FBR_CANVAS_HEIGHT / minScale);
        blueprintContainer.addChild(background);

        var isX0InHalfGrid = false;
        var isY0InHalfGrid = false;
        if (entities[0]) {
            var entity = entities[0];
            var xEndsInHalf = entity.position.x - Math.floor(entity.position.x) > 0.4;
            var yEndsInHalf = entity.position.y - Math.floor(entity.position.y) > 0.4;
            var entityDrawingSpec = getEntityDrawingSpecForEntity(entity);
            if (entityDrawingSpec) {
                var sizeW = entityDrawingSpec.gridSize.w;
                var sizeH = entityDrawingSpec.gridSize.h;
                isX0InHalfGrid = (sizeW % 2 == 0) == xEndsInHalf;
                isY0InHalfGrid = (sizeH % 2 == 0) == yEndsInHalf;
            }
        }

        $.each(tiles, function (key, entity) {
            var spriteLayers;
            if (FactorioBlueprintReader.tiles[entity.name]) {
                // overwrite getRandomInt for a moment to make sure tiling stays the same every time
                var prevRandomInt = getRandomInt;
                getRandomInt = function (min, max) {
                    var number = Math.floor(Math.abs(hashTwoIntegers(Math.floor(entity.position.x), Math.floor(entity.position.y))));
                    number = number % (1 + max - min);
                    return number + min;
                };
                spriteLayers = createEntityLayers(FactorioBlueprintReader.tiles[entity.name].image);
                getRandomInt = prevRandomInt;
            } else {
                console.log("Unknown tile name", entity.name);
                spriteLayers = new PIXI.Graphics();
                spriteLayers.beginFill(0xFFFFFF);
                spriteLayers.lineStyle(1, 0x333333);
                spriteLayers.drawRect(0, 0, FBR_PIXELS_PER_TILE, FBR_PIXELS_PER_TILE);
            }
            var gridX = Math.floor(entity.position.x - minXY - (isX0InHalfGrid ? 1 : 0));
            var gridY = Math.floor(entity.position.y - minXY - (isY0InHalfGrid ? 1 : 0));
            $.each(spriteLayers, function (layerNumber, sprite) {
                sprite.x = gridX * FBR_PIXELS_PER_TILE;
                sprite.y = gridY * FBR_PIXELS_PER_TILE;
                blueprintContainer.addChild(sprite);
            });
        });

        var layers = [];

        $.each(allYCoordinates, function (_, y) {
            $.each(entitiesByYX[y], function (x, entitiesForYX) {
                $.each(entitiesForYX, function (_, entityKey) {
                    renderEntityToLayers(layers, minXY, entities[entityKey]);
                })
            })
        });

        $.each(layers, function (layerNumber, layer) {
            if (layer) {
                blueprintContainer.addChild(layer);
            }
        });

        var circuitryLayer = new PIXI.Graphics();
        circuitryLayer.alpha = 0.5;

        function getCircuitXYTargetFromEntity(entity, circuitId) {
            var sizeW = 1;
            var sizeH = 1;
            var entityDrawingSpec = getEntityDrawingSpecForEntity(entity);
            if (entityDrawingSpec) {
                sizeW = entityDrawingSpec.gridSize.w;
                sizeH = entityDrawingSpec.gridSize.h;
            }
            var gridX = Math.floor(entity.position.x - minXY - sizeW / 2);
            var gridY = Math.floor(entity.position.y - minXY - sizeH / 2);
            var x = gridX * FBR_PIXELS_PER_TILE;
            var y = gridY * FBR_PIXELS_PER_TILE;


            var xOffset = 16;
            var yOffset = 16;
            if (entityDrawingSpec && entityDrawingSpec.circuitEndpoints && entityDrawingSpec.circuitEndpoints[circuitId]) {
                xOffset = entityDrawingSpec.circuitEndpoints[circuitId].x;
                yOffset = entityDrawingSpec.circuitEndpoints[circuitId].y;
            } else if (entityDrawingSpec) {
                xOffset = FBR_PIXELS_PER_TILE * entityDrawingSpec.gridSize.w / 2;
                yOffset = FBR_PIXELS_PER_TILE * entityDrawingSpec.gridSize.h / 2;
            }

            return {x: x + xOffset, y: y + yOffset};
        }

        function drawCircuitLine(fromEntityNumber, startPosition, connection) {
            var targetEntityId = connection.entity_id;
            if (targetEntityId < fromEntityNumber || (targetEntityId == fromEntityNumber && connection.circuit_id == 1)) {
                return;
            }
            var targetCircuitId = connection.circuit_id || 1;
            var targetEntity = entities[targetEntityId - 1];
            if (targetEntity.entity_number != targetEntityId) {
                console.log("Circuit target entity id conflict", targetEntity.entity_number, targetEntityId);
                return;
            }
            var targetPosition = getCircuitXYTargetFromEntity(targetEntity, targetCircuitId);
            circuitryLayer.moveTo(startPosition.x, startPosition.y);
            circuitryLayer.bezierCurveTo(startPosition.x - 10, startPosition.y + 10, targetPosition.x + 10, targetPosition.y + 10, targetPosition.x, targetPosition.y);

        }

        $.each(entities, function (key, entity) {
            if (!entity.connections) {
                return;
            }
            var entity_number = entity.entity_number;
            $.each(entity.connections, function (circuitId, connections) {
                var startPosition = getCircuitXYTargetFromEntity(entity, circuitId);
                circuitryLayer.lineStyle(2, 0xff0000);
                $.each(connections.red, function (_, connection) {
                    drawCircuitLine(entity_number, startPosition, connection);
                });
                circuitryLayer.lineStyle(2, 0x00ff00);
                $.each(connections.green, function (_, connection) {
                    drawCircuitLine(entity_number, startPosition, connection);
                });
            });
        });

        blueprintContainer.addChild(circuitryLayer);


        FactorioBlueprintReader.zoomAndPanHandler.setOnMouseClickListener(function (x, y) {
            x = Math.floor(x / FBR_PIXELS_PER_TILE);
            y = Math.floor(y / FBR_PIXELS_PER_TILE);
            /*$.each(tiles, function (key, entity) {
             var gridX = Math.floor(entity.position.x - minXY - 0.5);
             var gridY = Math.floor(entity.position.y - minXY - 0.5);
             if (gridX == x && gridY == y) {
             console.log('tile', entity.name, '(' + x + ', ' + y + ')', entity);
             }
             });*/


            $.each(entities, function (key, entity) {
                var sizeW = 1;
                var sizeH = 1;
                var entityDrawingSpec = getEntityDrawingSpecForEntity(entity);
                if (entityDrawingSpec) {
                    sizeW = entityDrawingSpec.gridSize.w;
                    sizeH = entityDrawingSpec.gridSize.h;
                }
                var gridX = Math.floor(entity.position.x - minXY - sizeW / 2);
                var gridY = Math.floor(entity.position.y - minXY - sizeH / 2);
                if (x >= gridX && x < gridX + sizeW && y >= gridY && y < gridY + sizeH) {
                    BootstrapDialog.show({
                        title:   entity.name,
                        animate: false,
                        message: '<pre class="json">' + JSON.stringify(entity, null, '    ') + '</pre>',
                        buttons: [{
                            label:  'OK',
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }],
                        onshown: function (dialogRef) {
                            $('pre.json').each(function (i, block) {
                                hljs.highlightBlock(block);
                            });
                        }
                    });
                }
            });

            //console.log(x, y);
        });

        return blueprintContainer;
    }
})();