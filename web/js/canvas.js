const IMAGES_PREFIX = "images/factorio/";
const PIXELS_PER_FIELD = 32;

const STATUS_WIDTH = 100;
const STATUS_HEIGHT = 20;

var WIDTH = 768;
var HEIGHT = 768;

var BX = 0,
    BY = 0,
    BSX = 1,
    BSY = 1,
    BR = 0,
    NX = 0,
    NY = 0,
    GX = 0,
    GY = 0,
    GSX = 1,
    GSY = 1,
    GR = 0,
    SX = 0,
    SY = 0;

function redoEntities() {
    FactorioBlueprintReader.entities = {};

    $.each(FactorioBlueprintReader.createEntitiesFunctions, function (_, func) {
        $.each(func(), function (entityKey, entitySpec) {
            FactorioBlueprintReader.entities[entityKey] = entitySpec;
        });
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEntitySprite(entityImageSpec) {
    var sprite;

    if (entityImageSpec.type == 'sprite') {
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + entityImageSpec.path]);
    } else if (entityImageSpec.type == 'trim') {
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + entityImageSpec.path + "." + entityImageSpec.number]);
    } else if (entityImageSpec.type == 'random_trim') {
        var number = getRandomInt(entityImageSpec.from, entityImageSpec.to);
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + entityImageSpec.path + "." + number]);
    } else if (entityImageSpec.type == 'animated') {
        var frames = [];
        for (var i = entityImageSpec.from; i <= entityImageSpec.to; i++) {
            frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + entityImageSpec.path + "." + i]);
        }
        if (entityImageSpec.reverse) {
            for (var j = entityImageSpec.to; j >= entityImageSpec.from; j--) {
                frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + entityImageSpec.path + "." + j]);
            }
        }
        sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.animationSpeed = entityImageSpec.animationSpeed || 1;
        sprite.play();
    } else if (entityImageSpec.type == 'container') {
        var container = new PIXI.Container();
        for (var imageKey in entityImageSpec.images) {
            if (entityImageSpec.images.hasOwnProperty(imageKey)) {
                var entity = createEntitySprite(entityImageSpec.images[imageKey]);
                entity.x = entityImageSpec.images[imageKey].x;
                entity.y = entityImageSpec.images[imageKey].y;
                container.addChild(entity);
            }
        }

        sprite = container;
    } else {
        throw 'unknown type ' + entityImageSpec.type;
    }

    if (entityImageSpec.scale) {
        sprite.scale.x = entityImageSpec.scale.x;
        sprite.scale.y = entityImageSpec.scale.y;
    }

    if (entityImageSpec.rotation) {
        sprite.anchor.set(0.5, 0.5);
        sprite.rotation = entityImageSpec.rotation * Math.PI;
    }

    if (entityImageSpec.alpha) {
        sprite.alpha = entityImageSpec.alpha;
    }

    return sprite;
}

function drawBlueprint(stage, blueprintData) {
    var entities = blueprintData.blueprint.blueprint.entities;
    var tiles = blueprintData.blueprint.blueprint.tiles;

    var minXY = 0;
    var maxXY = 0;

    var entitiesByXY = {};
    $.each(tiles, function (key, entity) {
        var x = entity.position.x;
        var y = entity.position.y;
        minXY = Math.min(minXY, x, y);
        maxXY = Math.max(maxXY, x, y);
    });
    $.each(entities, function (key, entity) {
        var x = entity.position.x;
        var y = entity.position.y;

        if (!entitiesByXY[x]) {
            entitiesByXY[x] = {};
        }
        entitiesByXY[x][y] = key;

        minXY = Math.min(minXY, x, y);
        maxXY = Math.max(maxXY, x, y);
    });

    minXY -= 5;
    maxXY += 5;

    var sizeXY = maxXY - minXY;
    var minScale = Math.min(1, WIDTH / (sizeXY * PIXELS_PER_FIELD), HEIGHT / (sizeXY * PIXELS_PER_FIELD));

    var blueprintContainer = new PIXI.Container();
    blueprintContainer.scale.x = blueprintContainer.scale.y = minScale;

    var background = new PIXI.extras.TilingSprite(PIXI.loader.resources[IMAGES_PREFIX + "background.png"].texture, WIDTH / minScale, HEIGHT / minScale);
    blueprintContainer.addChild(background);

    $.each(tiles, function (key, entity) {
        var sprite;
        if (FactorioBlueprintReader.tiles[entity.name]) {
            Math.seedrandom(entity.position.x + "," + entity.position.y);
            sprite = createEntitySprite(FactorioBlueprintReader.tiles[entity.name].image);
        } else {
            console.log("Unknown tile name", entity.name);
            sprite = new PIXI.Graphics();
            sprite.beginFill(0xFFFFFF);
            sprite.lineStyle(1, 0x333333);
            sprite.drawRect(0, 0, PIXELS_PER_FIELD, PIXELS_PER_FIELD);
        }
        var gridX = Math.floor(entity.position.x - minXY - 0.5);
        var gridY = Math.floor(entity.position.y - minXY - 0.5);
        sprite.x = gridX * PIXELS_PER_FIELD;
        sprite.y = gridY * PIXELS_PER_FIELD;
        blueprintContainer.addChild(sprite);
    });

    Math.seedrandom();

    $.each(entities, function (key, entity) {
        var sprite = null;
        var sizeW = 0;
        var sizeH = 0;
        var xOffset = 0;
        var yOffset = 0;
        if (!FactorioBlueprintReader.entities[entity.name]) {
            console.log("Unknown entity name", entity.name);
            sprite = new PIXI.Graphics();
            sprite.beginFill(0xFFFFFF);
            sprite.lineStyle(1, 0x000000);
            sprite.drawRect(0, 0, PIXELS_PER_FIELD, PIXELS_PER_FIELD);
            sizeW = 1;
            sizeH = 1;
            xOffset = 0;
            yOffset = 0;
        } else {
            var entityDrawingSpec = FactorioBlueprintReader.entities[entity.name];
            if (entity.direction && entityDrawingSpec.directions && entityDrawingSpec.directions[entity.direction]) {
                entityDrawingSpec = $.extend({}, entityDrawingSpec, entityDrawingSpec.directions[entity.direction]);
            }
            sprite = createEntitySprite(entityDrawingSpec.image);
            sizeW = entityDrawingSpec.gridSize.w;
            sizeH = entityDrawingSpec.gridSize.h;
            xOffset = entityDrawingSpec.offset.x;
            yOffset = entityDrawingSpec.offset.y;
        }

        if (sprite != null) {
            var gridX = Math.floor(entity.position.x - minXY - sizeW / 2);
            var gridY = Math.floor(entity.position.y - minXY - sizeH / 2);
            sprite.x = gridX * PIXELS_PER_FIELD + xOffset;
            sprite.y = gridY * PIXELS_PER_FIELD + yOffset;
            blueprintContainer.addChild(sprite);
        }
    });

    return blueprintContainer;
}

var redraw;

$(function () {

    redoEntities();

    WIDTH = $(".container-fluid .starter-template").width();
    HEIGHT = $(window).height() - 250;

    var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {antialias: true, forceFXAA: true});
    renderer.backgroundColor = 0x000000;

    $(".container-fluid .starter-template").get(0).appendChild(renderer.view);

    FactorioBlueprintReader.keyboardHandler.init();
    FactorioBlueprintReader.zoomAndPanHandler.init(renderer.view);

    var stage = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    stage.addChild(graphics);

    var bottomStatus = new PIXI.Container();
    bottomStatus.x = WIDTH - 100;
    bottomStatus.y = HEIGHT - 20;

    var positionBackground = new PIXI.Graphics();
    positionBackground.beginFill(0xCCCCCC);
    positionBackground.lineStyle(0, 0x000000);
    positionBackground.drawRect(0, 0, STATUS_WIDTH, STATUS_HEIGHT);
    bottomStatus.addChild(positionBackground);
    var statusText = new PIXI.Text("(0, 0)", new PIXI.TextStyle({
        align:      'right',
        fontFamily: 'Arial',
        fontSize:   10
    }));
    statusText.anchor.set(1, 0);
    statusText.x = STATUS_WIDTH - 10;
    statusText.y = 2;
    bottomStatus.addChild(statusText);

    FactorioBlueprintReader.zoomAndPanHandler.setOnMousePositionChanged(function (x, y) {
        statusText.text = '(' + Math.floor(x / PIXELS_PER_FIELD) + ', ' + Math.floor(y / PIXELS_PER_FIELD) + ')';
    });

    var gameContainer = new PIXI.Container();

    PIXI.loader
        .add(FactorioBlueprintReader.Loader.getImagesToLoad())
        .on("progress", function (loader, resource) {

            var url = resource.url;
            var name = resource.name;

            graphics.clear();
            graphics.beginFill(0xFFFFFF);
            graphics.lineStyle(5, 0x000000);
            graphics.drawRect(20, HEIGHT / 2 - 20, WIDTH - 40, 40);

            graphics.beginFill(0x0000FF);
            graphics.drawRect(20, HEIGHT / 2 - 20, (WIDTH - 40) / 100 * loader.progress, 40);
        })
        .load(function () {
            stage.removeChild(graphics);
            stage.addChild(gameContainer);
            stage.addChild(bottomStatus);
            graphics = null;

            FactorioBlueprintReader.Loader.prepareTrimmedTextures();

            var blueprintContainer = null;

            $.ajax({
                dataType: "json",
                url:      "/blueprint",
                data:     [],
                success:  function (data) {
                    blueprintContainer = drawBlueprint(stage, data);
                    FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);
                    gameContainer.addChild(blueprintContainer);

                    redraw = function () {
                        gameContainer.removeChild(blueprintContainer);
                        var containerToDestroy = blueprintContainer;
                        setTimeout(function () {
                            containerToDestroy.destroy({children: true});
                            containerToDestroy = null;
                        }, 0);

                        redoEntities();
                        blueprintContainer = drawBlueprint(stage, data);
                        FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);

                        gameContainer.addChild(blueprintContainer);
                    }
                }
            });

            function gameLoop() {
                requestAnimationFrame(gameLoop);
                FactorioBlueprintReader.zoomAndPanHandler.handleKeyboardPanning();
                renderer.render(stage);
            }

            gameLoop();
        });
});
