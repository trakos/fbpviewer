const forEach = require("lodash.foreach");
const merge = require("lodash.merge");
const BootstrapDialog = require("bootstrap3-dialog");
const hljs = require("highlight.js");
const {iconSize} = require("./factorio/icons");

class BlueprintRenderer {
    constructor(FactorioBlueprintReader, animationHandler, zoomAndPanHandler, keyboardHandler) {
        this.DEFAULT_LAYER = 100;
        this.OVERLAY_LAYER = 200;
        this.factorioBlueprintReader = FactorioBlueprintReader;
        this.animationHandler = animationHandler;
        this.zoomAndPanHandler = zoomAndPanHandler;
        this.keyboardHandler = keyboardHandler;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    hashTwoIntegers(a, b) {
        var A = a >= 0 ? 2 * a : -2 * a - 1;
        var B = b >= 0 ? 2 * b : -2 * b - 1;
        var C = (A >= B ? A * A + A + B : A + B * B) / 2;
        return a < 0 && b < 0 || a >= 0 && b >= 0 ? C : -C - 1;
    }

    approximateDirectionFromOrientation(orientation) {
        // Locomotive and train wagons have float orientations, but I'm only supporting integer directions.
        let direction = Math.round(8 * orientation);
        direction += 1;
        return direction % 8;
    }

    getEntityDrawingSpecForEntity(entity) {
        var entityDrawingSpec = this.factorioBlueprintReader.entities[entity.name];
        if (!entityDrawingSpec) {
            return null;
        }
        if (entity.type && entityDrawingSpec.types) {
            entityDrawingSpec = merge({}, entityDrawingSpec, entityDrawingSpec.types[entity.type]);
        }
        if (entity.from_direction !== undefined) {
            const direction = entity.direction ? entity.direction : '0';
            entityDrawingSpec = merge({}, entityDrawingSpec, entityDrawingSpec.directions[entity.from_direction + '_' + direction]);
        } else if (entity.direction && entityDrawingSpec.directions && entityDrawingSpec.directions[entity.direction]) {
            entityDrawingSpec = merge({}, entityDrawingSpec, entityDrawingSpec.directions[entity.direction]);
        } else if (entity.orientation !== undefined) {
            let direction = this.approximateDirectionFromOrientation(entity.orientation);
            if (entityDrawingSpec.directions && entityDrawingSpec.directions[direction]) {
                entityDrawingSpec = merge({}, entityDrawingSpec, entityDrawingSpec.directions[direction]);
            }
        }

        return entityDrawingSpec;
    }

    createEntityLayers(entityImageSpec, entitySpec) {
        var layerSprites = {};

        if (entityImageSpec.type == 'sprite') {
            layerSprites[entityImageSpec.layer || this.DEFAULT_LAYER] = new PIXI.Sprite(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + entityImageSpec.path));
        } else if (entityImageSpec.type == 'trim') {
            layerSprites[entityImageSpec.layer || this.DEFAULT_LAYER] = new PIXI.Sprite(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + entityImageSpec.path + "." + entityImageSpec.number));
        } else if (entityImageSpec.type == 'random_trim') {
            var number = this.getRandomInt(entityImageSpec.from, entityImageSpec.to);
            layerSprites[entityImageSpec.layer || this.DEFAULT_LAYER] = new PIXI.Sprite(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + entityImageSpec.path + "." + number));
        } else if (entityImageSpec.type == 'animated') {
            var frames = [];
            for (var i = entityImageSpec.from; i <= entityImageSpec.to; i++) {
                frames.push(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + entityImageSpec.path + "." + i));
                //frames.push(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + i]);
            }
            if (entityImageSpec.reverse) {
                for (var j = entityImageSpec.to; j >= entityImageSpec.from; j--) {
                    frames.push(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + entityImageSpec.path + "." + j));
                    //frames.push(PIXI.utils.TextureCache[FBR_IMAGES_PREFIX + entityImageSpec.path + "." + j]);
                }
            }
            var sprite = new PIXI.extras.AnimatedSprite(frames);
            sprite.animationSpeed = entityImageSpec.animationSpeed || 1;
            sprite.play();
            layerSprites[entityImageSpec.layer || this.DEFAULT_LAYER] = sprite;
        } else if (entityImageSpec.type == 'container') {
            for (var imageKey in entityImageSpec.images) {
                if (entityImageSpec.images.hasOwnProperty(imageKey)) {
                    var entityLayers = this.createEntityLayers(entityImageSpec.images[imageKey], entitySpec);
                    forEach(entityLayers, (entityLayer, layer) => {
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

        forEach(layerSprites, (layerSprite, layerNumber) => {
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

    drawLayers(destinationLayers, sourceLayers, gridX, gridY, xOffset, yOffset) {
        forEach(sourceLayers, (spriteLayer, layerNumber) => {
            spriteLayer.x = gridX * FBR_PIXELS_PER_TILE + xOffset;
            spriteLayer.y = gridY * FBR_PIXELS_PER_TILE + yOffset;
            destinationLayers[layerNumber] = destinationLayers[layerNumber] || new PIXI.Container();
            destinationLayers[layerNumber].addChild(spriteLayer);
        });
    }

    createIconSprite(imageSpec) {
        var iconLayers = this.createEntityLayers(imageSpec);
        var darkBackground = new PIXI.Sprite(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + this.factorioBlueprintReader.ImagesUI.INFO_DARK_BACKGROUND));
        darkBackground.anchor.x = 0.5;
        darkBackground.anchor.y = 0.5;
        iconLayers[this.OVERLAY_LAYER - 10] = darkBackground;

        return iconLayers;
    }

    renderEntityToLayers(layers, minX, minY, entity) {
        var spriteLayers = {};
        var sizeW = 0;
        var sizeH = 0;
        var xOffset = 0;
        var yOffset = 0;
        var entityDrawingSpec = this.getEntityDrawingSpecForEntity(entity);
        if (!entityDrawingSpec) {
            console.log("Unknown entity name", entity.name);
            var sprite = new PIXI.Graphics();
            sprite.beginFill(0xFFFFFF);
            sprite.lineStyle(1, 0x000000);
            sprite.drawRect(0, 0, FBR_PIXELS_PER_TILE, FBR_PIXELS_PER_TILE);
            spriteLayers[this.DEFAULT_LAYER] = sprite;
            sizeW = 1;
            sizeH = 1;
            xOffset = 0;
            yOffset = 0;
        } else {
            spriteLayers = this.createEntityLayers(entityDrawingSpec.image, entity);
            sizeW = entityDrawingSpec.gridSize.w;
            sizeH = entityDrawingSpec.gridSize.h;
            xOffset = entityDrawingSpec.offset.x;
            yOffset = entityDrawingSpec.offset.y;
        }

        var gridX = Math.floor(entity.position.x - minX - sizeW / 2);
        var gridY = Math.floor(entity.position.y - minY - sizeH / 2);
        this.drawLayers(layers, spriteLayers, gridX, gridY, xOffset, yOffset);


        if (entity.recipe) {
            if (!this.factorioBlueprintReader.icons[entity.recipe]) {
                console.log('Can\'t find icon for recipe', entity.recipe);
            } else {
                var iconLayers = this.createIconSprite(this.factorioBlueprintReader.icons[entity.recipe].image);
                xOffset = (sizeW * FBR_PIXELS_PER_TILE) / 2;
                yOffset = (sizeH * FBR_PIXELS_PER_TILE) / 2;
                this.drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
            }
        }

        if (entity.items) {
            var itemCount = 0;
            forEach(entity.items, (entityItem) => {
                // apparently items can be an array or an object
                // i.e. either [{name: 'blabla', count:5}] or just {blabla:5}
                itemCount += entityItem.count ? entityItem.count : entityItem;
            });
            var startX = (sizeW * FBR_PIXELS_PER_TILE - itemCount * this.factorioBlueprintReader.iconSize / 2) / 2;
            // add another half of icon size (which is uses scale 0.5, so a quarter of size) due to anchor being 0.5
            startX += this.factorioBlueprintReader.iconSize / 4;
            var itemNumber = 0;
            forEach(entity.items, (entityItem, itemName) => {
                // apparently items can be an array or an object
                // i.e. either [{name: 'blabla', count:5}] or just {blabla:5}
                var count = entityItem;
                if (entityItem.item) {
                    itemName = entityItem.item;
                    count = entityItem.count;
                }
                for (var k = 0; k < count; k++) {
                    if (!this.factorioBlueprintReader.icons[itemName]) {
                        console.log('Can\'t find icon for item', itemName);
                    } else {
                        var iconLayers = this.createIconSprite(this.factorioBlueprintReader.icons[itemName].image);
                        forEach(iconLayers, (layerContainer, layerNumber) => {
                            layerContainer.scale.x = layerContainer.scale.y = 0.25;
                        });
                        xOffset = startX + this.factorioBlueprintReader.iconSize / 2 * itemNumber;
                        yOffset = (sizeH * FBR_PIXELS_PER_TILE) / 2 + this.factorioBlueprintReader.iconSize;
                        this.drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
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
        forEach(filters, (filterItem) => {
            if (!this.factorioBlueprintReader.icons[filterItem.name]) {
                console.log('Can\'t find icon for item', filterItem.name);
            } else {
                var iconLayers = this.createIconSprite(this.factorioBlueprintReader.icons[filterItem.name].image);
                forEach(iconLayers, (layerContainer, layerNumber) => {
                    layerContainer.scale.x = layerContainer.scale.y = 0.2;
                });
                xOffset = (filterItemNumber % 2 == 0 ? 0 : 16) + (this.factorioBlueprintReader.iconSize * 0.2);
                yOffset = (Math.floor(filterItemNumber % 4 / 2) * 16) + (this.factorioBlueprintReader.iconSize * 0.2);
                this.drawLayers(layers, iconLayers, gridX, gridY, xOffset, yOffset);
                // if there's more than 4, cycle between them every 2 seconds; also hide if alt is pressed
                var everyNSeconds = 5;
                var currentFilterItemNumber = filterItemNumber;
                this.animationHandler.addOnSecondTickListener((second) => {
                    forEach(iconLayers, (layerContainer, layerNumber) => {
                        var altPressed = this.keyboardHandler.isPressed(this.keyboardHandler.keys.alt);
                        layerContainer.visible = (!altPressed) && Math.floor(second / everyNSeconds) % (Math.ceil(filters.length / 4)) == Math.floor(currentFilterItemNumber / 4);
                    });
                });
            }
            filterItemNumber++;
        });

    }

    getEntityWithNameMatchingRegex(entities, entitiesByYX, y, x, regex) {
        if (!entitiesByYX[y] || !entitiesByYX[y][x]) {
            return null;
        }

        for (const entityIndex of entitiesByYX[y][x]) {
            const entity = entities[entityIndex];
            if (entity.name.match(regex)) {
                return entity;
            }
        }

        return null;
    }

    oppositeDirection(direction) {
        if (!direction) {
            direction = 0;
        }

        switch (direction) {
            case 0:
                return 4;
            case 2:
                return 6;
            case 4:
                return 0;
            case 6:
                return 2;
        }
    }

    directionTransformation(direction) {
        if (!direction) {
            direction = 0;
        }

        switch (direction) {
            case 0:
                return {x: 0, y: -1}
            case 2:
                return {x: 1, y: 0};
            case 4:
                return {x: 0, y: 1};
            case 6:
                return {x: -1, y: 0};
        }
    }

    entityHasDirection(entity, direction) {
        return entity.direction === direction || (!entity.direction && !direction);
    }

    hasBeltTargetingItFromDirection(entities, entitiesByYX, directedToY, directedToX, direction) {
        const isX0InHalfGrid = this.isX0OnHalfGrid(entities);
        const isY0InHalfGrid = this.isY0OnHalfGrid(entities);
        const targetDirection = this.oppositeDirection(direction);
        const transformation = this.directionTransformation(direction);
        const fromY = parseInt(directedToY) + transformation.y;
        const fromX = parseInt(directedToX) + transformation.x;
        const belt = this.getEntityWithNameMatchingRegex(entities, entitiesByYX, fromY, fromX, /transport-belt$/i);
        if (belt !== null) {
            return this.entityHasDirection(belt, targetDirection);
        }
        const underneathie = this.getEntityWithNameMatchingRegex(entities, entitiesByYX, fromY, fromX, /underground-belt$/i);
        if (underneathie !== null && underneathie.type === 'output' && this.entityHasDirection(underneathie, targetDirection)) {
            return true;
        }
        const splitter = this.getEntityWithNameMatchingRegex(entities, entitiesByYX, fromY, fromX, /splitter$/i);
        if (splitter !== null && this.entityHasDirection(splitter, targetDirection)) {
            return true;
        }
        // Splitter is 2-high
        if (targetDirection === 2 || targetDirection === 6) {
            const diffY = isY0InHalfGrid ? 1 : -1;
            const splitter2 = this.getEntityWithNameMatchingRegex(entities, entitiesByYX, fromY + diffY, fromX, /splitter$/i);
            if (splitter2 !== null && this.entityHasDirection(splitter2, targetDirection)) {
                return true;
            }
        }
        // Splitter is 2-wide
        if (targetDirection === 0 || targetDirection === 4) {
            const diffX = isX0InHalfGrid ? -1 : 1;
            const splitter2 = this.getEntityWithNameMatchingRegex(entities, entitiesByYX, fromY, fromX + diffX, /splitter$/i);
            if (splitter2 !== null && this.entityHasDirection(splitter2, targetDirection)) {
                return true;
            }
        }
        return false;
    }

    clockwiseDirection(direction, by) {
        if (!direction) {
            direction = 0;
        }
        direction += by;
        return direction > 7 ? direction - 8 : direction;
    }

    counterClockwiseDirection(direction, by) {
        if (!direction) {
            direction = 0;
        }
        direction -= by;
        return direction < 0 ? direction + 8 : direction;
    }

    connectEntities(entities, entitiesByYX) {
        for (const y in entitiesByYX) {
            for (const x in entitiesByYX[y]) {
                for (const entityIndex of entitiesByYX[y][x]) {
                    const entity = entities[entityIndex];
                    if (entity.name.match(/transport-belt$/i)) {
                        if (this.hasBeltTargetingItFromDirection(entities, entitiesByYX, y, x, this.oppositeDirection(entity.direction))) {
                            continue;
                        }

                        if (this.hasBeltTargetingItFromDirection(entities, entitiesByYX, y, x, this.counterClockwiseDirection(entity.direction, 2))
                            && this.hasBeltTargetingItFromDirection(entities, entitiesByYX, y, x, this.clockwiseDirection(entity.direction, 2))) {
                            continue;
                        }

                        if (this.hasBeltTargetingItFromDirection(entities, entitiesByYX, y, x, this.counterClockwiseDirection(entity.direction, 2))) {
                            entity.from_direction = this.counterClockwiseDirection(entity.direction, 2);
                        }

                        if (this.hasBeltTargetingItFromDirection(entities, entitiesByYX, y, x, this.clockwiseDirection(entity.direction, 2))) {
                            entity.from_direction = this.clockwiseDirection(entity.direction, 2);
                        }
                    }
                }
            }
        }
    }

    isX0OnHalfGrid(entities) {
        if (entities[0]) {
            var entity = entities[0];
            var xEndsInHalf = entity.position.x - Math.floor(entity.position.x) > 0.4;
            var entityDrawingSpec = this.getEntityDrawingSpecForEntity(entity);
            if (entityDrawingSpec) {
                var sizeW = entityDrawingSpec.gridSize.w;
                return (sizeW % 2 == 0) == xEndsInHalf;
            }
        }
    }

    isY0OnHalfGrid(entities) {
        if (entities[0]) {
            var entity = entities[0];
            var yEndsInHalf = entity.position.y - Math.floor(entity.position.y) > 0.4;
            var entityDrawingSpec = this.getEntityDrawingSpecForEntity(entity);
            if (entityDrawingSpec) {
                var sizeH = entityDrawingSpec.gridSize.h;
                return (sizeH % 2 == 0) == yEndsInHalf;
            }
        }
    }

    renderBlueprint(pixiRenderer, stage, blueprint) {
        var entities = blueprint.entities || [];
        var tiles = blueprint.tiles || [];

        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;

        forEach(tiles, (entity) => {
            var x = entity.position.x;
            var y = entity.position.y;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });

        var entitiesByYX = {};
        var allYCoordinates = [];
        forEach(entities, (entity, key) => {
            var x = parseInt(Math.floor(entity.position.x));
            var y = parseInt(Math.ceil(entity.position.y));

            entitiesByYX[y] = entitiesByYX[y] || {};
            entitiesByYX[y][x] = entitiesByYX[y][x] || [];
            entitiesByYX[y][x].push(key);

            if (allYCoordinates.indexOf(y) === -1) {
                allYCoordinates.push(y);
            }

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });
        allYCoordinates.sort((a, b) => {
            return a - b;
        });

        if (
            minX === Number.POSITIVE_INFINITY
            || minY === Number.POSITIVE_INFINITY
            || maxX === Number.NEGATIVE_INFINITY
            || maxY === Number.NEGATIVE_INFINITY
        ) {
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;
        }

        minX -= 5;
        minY -= 5;
        maxX += 5;
        maxY += 5;

        this.connectEntities(entities, entitiesByYX);

        var sizeXY = Math.max(maxX - minX, maxY - minY);
        var minScale = Math.min(1, FBR_CANVAS_WIDTH / (sizeXY * FBR_PIXELS_PER_TILE), FBR_CANVAS_HEIGHT / (sizeXY * FBR_PIXELS_PER_TILE));

        var blueprintContainer = new PIXI.Container();
        blueprintContainer.scale.x = blueprintContainer.scale.y = minScale;

        var background = new PIXI.extras.TilingSprite(PIXI.Texture.fromFrame(FBR_IMAGES_PREFIX + this.factorioBlueprintReader.ImagesUI.BACKGROUND), FBR_CANVAS_WIDTH / minScale, FBR_CANVAS_HEIGHT / minScale);
        blueprintContainer.addChild(background);

        var isX0InHalfGrid = this.isX0OnHalfGrid(entities);
        var isY0InHalfGrid = this.isY0OnHalfGrid(entities);

        forEach(tiles, (entity, key) => {
            var spriteLayers;
            if (this.factorioBlueprintReader.tiles[entity.name]) {
                // overwrite getRandomInt for a moment to make sure tiling stays the same every time
                var prevRandomInt = this.getRandomInt;
                this.getRandomInt = function (min, max) {
                    var number = Math.floor(Math.abs(this.hashTwoIntegers(Math.floor(entity.position.x), Math.floor(entity.position.y))));
                    number = number % (1 + max - min);
                    return number + min;
                };
                spriteLayers = this.createEntityLayers(this.factorioBlueprintReader.tiles[entity.name].image);
                this.getRandomInt = prevRandomInt;
            } else {
                console.log("Unknown tile name", entity.name);
                spriteLayers = new PIXI.Graphics();
                spriteLayers.beginFill(0xFFFFFF);
                spriteLayers.lineStyle(1, 0x333333);
                spriteLayers.drawRect(0, 0, FBR_PIXELS_PER_TILE, FBR_PIXELS_PER_TILE);
            }
            var gridX = Math.floor(entity.position.x - minX - (isX0InHalfGrid ? 1 : 0));
            var gridY = Math.floor(entity.position.y - minY - (isY0InHalfGrid ? 1 : 0));
            forEach(spriteLayers, (sprite, layerNumber) => {
                sprite.x = gridX * FBR_PIXELS_PER_TILE;
                sprite.y = gridY * FBR_PIXELS_PER_TILE;
                blueprintContainer.addChild(sprite);
            });
        });

        var layers = [];

        forEach(allYCoordinates, (y) => {
            forEach(entitiesByYX[y], (entitiesForYX) => {
                forEach(entitiesForYX, (entityKey) => {
                    this.renderEntityToLayers(layers, minX, minY, entities[entityKey]);
                })
            })
        });

        forEach(layers, (layer, layerNumber) => {
            if (layer) {
                blueprintContainer.addChild(layer);
            }
        });

        var circuitryLayer = new PIXI.Graphics();
        circuitryLayer.alpha = 0.5;

        const getCircuitXYTargetFromEntity = (entity, circuitId) => {
            var sizeW = 1;
            var sizeH = 1;
            var entityDrawingSpec = this.getEntityDrawingSpecForEntity(entity);
            if (entityDrawingSpec) {
                sizeW = entityDrawingSpec.gridSize.w;
                sizeH = entityDrawingSpec.gridSize.h;
            }
            var gridX = Math.floor(entity.position.x - minX - sizeW / 2);
            var gridY = Math.floor(entity.position.y - minY - sizeH / 2);
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

        const drawCircuitLine = (fromEntityNumber, startPosition, connection) => {
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

        forEach(entities, (entity) => {
            if (!entity.connections) {
                return;
            }
            var entity_number = entity.entity_number;
            forEach(entity.connections, (connections, circuitId) => {
                var startPosition = getCircuitXYTargetFromEntity(entity, circuitId);
                circuitryLayer.lineStyle(2, 0xff0000);
                forEach(connections.red, (connection) => {
                    drawCircuitLine(entity_number, startPosition, connection);
                });
                circuitryLayer.lineStyle(2, 0x00ff00);
                forEach(connections.green, (connection) => {
                    drawCircuitLine(entity_number, startPosition, connection);
                });
            });
        });

        blueprintContainer.addChild(circuitryLayer);


        this.zoomAndPanHandler.setOnMouseClickListener((x, y) => {
            x = Math.floor(x / FBR_PIXELS_PER_TILE);
            y = Math.floor(y / FBR_PIXELS_PER_TILE);

            forEach(entities, (entity) => {
                var sizeW = 1;
                var sizeH = 1;
                var entityDrawingSpec = this.getEntityDrawingSpecForEntity(entity);
                if (entityDrawingSpec) {
                    sizeW = entityDrawingSpec.gridSize.w;
                    sizeH = entityDrawingSpec.gridSize.h;
                }
                var gridX = Math.floor(entity.position.x - minX - sizeW / 2);
                var gridY = Math.floor(entity.position.y - minY - sizeH / 2);
                if (x >= gridX && x < gridX + sizeW && y >= gridY && y < gridY + sizeH) {
                    BootstrapDialog.show({
                        title:   entity.name,
                        animate: false,
                        message: '<pre class="json">' + JSON.stringify(entity, null, '    ') + '</pre>',
                        buttons: [{
                            label:  'OK',
                            action: (dialogRef) => {
                                dialogRef.close();
                            }
                        }],
                        onshown: (dialogRef) => {
                            $('pre.json').each((i, block) => {
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
}

module.exports = BlueprintRenderer;