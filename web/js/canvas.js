const IMAGES_PREFIX = "images/factorio/";
const PIXELS_PER_FIELD = 32;

var WIDTH = 768;
var HEIGHT = 768;



function createEntitySprite(entityImageSpec) {
    var sprite;

    if (entityImageSpec.type == 'sprite') {
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path]);
    } else if (entityImageSpec.type == 'trim') {
        sprite = new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path + "." + entityImageSpec.number]);
    } else if (entityImageSpec.type == 'animated') {
        var frames = [];
        for (var i = entityImageSpec.from; i <= entityImageSpec.to; i++) {
            frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path + "." + i]);
        }
        if (entityImageSpec.reverse) {
            for (var j = entityImageSpec.to; j >= entityImageSpec.from; j--) {
                frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path + "." + j]);
            }
        }
        sprite = new PIXI.extras.AnimatedSprite(frames);
        sprite.animationSpeed = entityImageSpec.animationSpeed || 1;
        sprite.play();

        return sprite;
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

    return sprite;
}

function drawBlueprint(stage, blueprintData) {
    var entities = blueprintData.blueprint.blueprint.entities;

    var minXY = 0;
    var maxXY = 0;

    var entitiesByXY = {};
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            var entity = entities[key];
            var x = entity.position.x;
            var y = entity.position.y;

            if (!entitiesByXY[x]) {
                entitiesByXY[x] = {};
            }
            entitiesByXY[x][y] = key;

            minXY = Math.min(minXY, x, y);
            maxXY = Math.max(maxXY, x, y);
        }
    }

    minXY -= 2;
    maxXY += 2;

    var sizeXY = maxXY - minXY;
    var minScale = Math.min(1, WIDTH / (sizeXY * PIXELS_PER_FIELD), HEIGHT / (sizeXY * PIXELS_PER_FIELD));

    var blueprintContainer = new PIXI.Container();
    blueprintContainer.scale.x = blueprintContainer.scale.y = minScale;

    var background = new PIXI.extras.TilingSprite(PIXI.loader.resources[IMAGES_PREFIX + "terrain/concrete/concrete4.png"].texture, WIDTH / minScale, HEIGHT / minScale);
    blueprintContainer.addChild(background);

    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            var entity = entities[key];

            var sprite = null;
            var sizeW = 0;
            var sizeH = 0;
            var xOffset = 0;
            var yOffset = 0;
            if (!FactorioBlueprintReader.entities.ENTITIES[entity.name]) {
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
                var entityDrawingSpec = FactorioBlueprintReader.entities.ENTITIES[entity.name];
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
        }
    }
    /*var assemblingMachine1 = createSpriteFromTexture(PIXI.TextureCache, "entity/assembling-machine-1/assembling-machine-1.png", 0, 0, 107, 113);


     var iconBg = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + "core/entity-info-dark-background.png"].texture);
     var sciencePack1Icon = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + FactorioBlueprintReader.ICONS_PREFIX + "science-pack-1.png"].texture);
     var sciencePack2Icon = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + FactorioBlueprintReader.ICONS_PREFIX + "science-pack-2.png"].texture);
     var sciencePack3Icon = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + FactorioBlueprintReader.ICONS_PREFIX + "science-pack-3.png"].texture);
     sciencePack1Icon.x = 10;
     sciencePack1Icon.y = 8;

     var iconWithBg = new PIXI.Container();
     iconWithBg.addChild(iconBg);
     iconWithBg.addChild(sciencePack1Icon);
     iconWithBg.x = 25;
     iconWithBg.y = 20;
     blueprintContainer.addChild(assemblingMachine1);
     blueprintContainer.addChild(iconWithBg);*/

    return blueprintContainer;
}

var redraw;

$(function () {

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

                    stage.addChild(blueprintContainer);

                    redraw = function () {
                        stage.removeChild(blueprintContainer);
                        redoEntities();
                        blueprintContainer = drawBlueprint(stage, data);
                        FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);

                        stage.addChild(blueprintContainer);
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
