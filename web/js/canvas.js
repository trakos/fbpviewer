const IMAGES_PREFIX = "images/factorio/";
const PIXELS_PER_FIELD = 32;

var WIDTH = 768;
var HEIGHT = 768;

function createSpriteFromTexture(TextureCache, imagePath, x, y, w, h) {
    var texture = TextureCache[IMAGES_PREFIX + imagePath];
    texture.frame = new PIXI.Rectangle(x, y, w, h);
    return new PIXI.Sprite(texture);
}

var imagesToLoad = [];

for (var key in FactorioBlueprintReader.icons.ICONS) {
    if (FactorioBlueprintReader.icons.ICONS.hasOwnProperty(key)) {
        imagesToLoad.push(IMAGES_PREFIX + FactorioBlueprintReader.icons.prefix + FactorioBlueprintReader.icons.ICONS[key]);
    }
}

for (var entityKey in FactorioBlueprintReader.entities.ENTITIES) {
    if (FactorioBlueprintReader.entities.ENTITIES.hasOwnProperty(entityKey)) {
        var entityData = FactorioBlueprintReader.entities.ENTITIES[entityKey];
        if (entityData.image.path) {
            imagesToLoad.push(IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityData.image.path);
        } else if (entityData.image.type == 'container') {
            for (var imageKey in entityData.image.images) {
                if (entityData.image.images.hasOwnProperty(imageKey)) {
                    var imageData = entityData.image.images[imageKey];
                    imagesToLoad.push(IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + imageData.path);
                }
            }
        }
    }
}

imagesToLoad.push(IMAGES_PREFIX + "terrain/concrete/concrete4.png");
imagesToLoad.push(IMAGES_PREFIX + "core/entity-info-dark-background.png");

function createEntitySprite(entityImageSpec) {
    if (entityImageSpec.type == 'sprite') {
        return new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path]);
    } else if (entityImageSpec.type == 'trim') {
        return new PIXI.Sprite(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path + "." + entityImageSpec.number]);
    } else if (entityImageSpec.type == 'animated') {
        var frames = [];
        for (var i = entityImageSpec.from; i <= entityImageSpec.to; i++) {
            frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + entityImageSpec.path + "." + i]);
        }
        var sprite = new PIXI.extras.AnimatedSprite(frames);
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

        return container;
    } else {
        throw 'unknown type ' + entityImageSpec.type;
    }
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
                sprite = createEntitySprite(entityDrawingSpec.image);
                sizeW = entityDrawingSpec.gridSize.w;
                sizeH = entityDrawingSpec.gridSize.h;
                xOffset = entityDrawingSpec.offset.x;
                yOffset = entityDrawingSpec.offset.y;

                console.log("Drawing ", entity.name, entityDrawingSpec, sprite);
            }

            /*switch (entity.name) {
                case 'chemical-plant':
                    //sprite = createSpriteFromTexture(PIXI.TextureCache, "entity/chemical-plant/chemical-plant.png", 366, 0, 122, 134);

                    sizeW = 3;
                    sizeH = 3;
                    xOffset = 0;
                    yOffset = 0;
                    break;
                case 'assembling-machine-3':
                    sprite = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/assembling-machine-3/assembling-machine-3.png", 0, 0, 107, 113);
                    sizeW = 3;
                    sizeH = 3;
                    xOffset = -5;
                    yOffset = -12;
                    break;
                case 'pipe':
                    sprite = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + "entity/pipe/pipe-straight-horizontal-single.png"].texture);
                    sizeW = 1;
                    sizeH = 1;
                    xOffset = -25;
                    yOffset = -22;
                    break;
                case 'transport-belt':
                    var frames = [];
                    for (var i = 0; i < 16; i++) {
                        frames.push(PIXI.utils.TextureCache[IMAGES_PREFIX + "entity/transport-belt/transport-belt.png." + i]);
                    }
                    sprite = new PIXI.extras.AnimatedSprite(frames);
                    sprite.play();
                    sizeW = 1;
                    sizeH = 1;
                    xOffset = -5;
                    yOffset = -5;
                    break;
                case 'lab':
                    sprite = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/lab/lab.png", 0, 0, 113, 91);
                    sizeW = 3;
                    sizeH = 3;
                    xOffset = 0;
                    yOffset = 5;
                    break;
                case 'centrifuge':
                    sprite = new PIXI.Container();
                    var centrifugeA = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/centrifuge/centrifuge-A.png", 0, 0, 70, 123);
                    var centrifugeB = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/centrifuge/centrifuge-B.png", 0, 0, 78, 117);
                    var centrifugeC = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/centrifuge/centrifuge-C.png", 0, 0, 119, 107);
                    centrifugeA.x = 0;
                    centrifugeA.y = 22;
                    centrifugeB.x = 44;
                    centrifugeB.y = 28;
                    centrifugeC.x = 0;
                    centrifugeC.y = 0;
                    sprite.addChild(centrifugeC);
                    sprite.addChild(centrifugeA);
                    sprite.addChild(centrifugeB);
                    sizeW = 3;
                    sizeH = 3;
                    xOffset = -12;
                    yOffset = 0;
                    break;
                case 'gate':
                    sprite = new PIXI.Container();
                    base = new PIXI.Sprite(PIXI.loader.resources[IMAGES_PREFIX + "entity/gate/gate-base-horizontal.png"].texture);
                    gate = createSpriteFromTexture(PIXI.utils.TextureCache, "entity/gate/gate-horizontal.png", 0, 0, 32, 36);
                    base.y = 15;
                    gate.y = -4;
                    sprite.addChild(base);
                    sprite.addChild(gate);
                    sizeW = 1;
                    sizeH = 1;
                    xOffset = 0;
                    yOffset = -5;
                    break;
                default:
                    console.log("Unknown entity name", entity.name);
                    sprite = new PIXI.Graphics();
                    sprite.beginFill(0xFFFFFF);
                    sprite.lineStyle(1, 0x000000);
                    sprite.drawRect(0, 0, PIXELS_PER_FIELD, PIXELS_PER_FIELD);
                    sizeW = 1;
                    sizeH = 1;
                    xOffset = 0;
                    yOffset = 0;
                    break;
            }*/

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

function prepareTrimmedTexture(imagePath, w, h, number) {
    if (PIXI.utils.TextureCache[imagePath + "." + number]) {
        return;
    }

    var textureWidth = PIXI.utils.TextureCache[imagePath].frame.width;
    var cols = textureWidth / w;
    var row = Math.floor(number / cols);
    var col = number % cols;

    var rect = new PIXI.Rectangle(w * col, h * row, w, h);
    console.log(imagePath + "." + number, rect);
    PIXI.utils.TextureCache[imagePath + "." + number] = new PIXI.Texture(PIXI.utils.TextureCache[imagePath].baseTexture, rect, rect.clone(), null, null);
}

function prepareTrimmedTexturesForImageData(imageData) {
    var imagePath = IMAGES_PREFIX + FactorioBlueprintReader.entities.PREFIX + imageData.path;
    if (imageData.type == 'trim') {
        prepareTrimmedTexture(imagePath, imageData.w, imageData.h, imageData.number);
    } else if (imageData.type == 'animated') {
        for (var k = imageData.from; k <= imageData.to; k++) {
            prepareTrimmedTexture(imagePath, imageData.w, imageData.h, k);
        }
    }
}

function trimTextures() {
    for (var entityKey in FactorioBlueprintReader.entities.ENTITIES) {
        if (FactorioBlueprintReader.entities.ENTITIES.hasOwnProperty(entityKey)) {
            var entityData = FactorioBlueprintReader.entities.ENTITIES[entityKey];
            if (entityData.image.path) {
                prepareTrimmedTexturesForImageData(entityData.image);
            } else if (entityData.image.type == 'container') {
                for (var imageKey in entityData.image.images) {
                    if (entityData.image.images.hasOwnProperty(imageKey)) {
                        prepareTrimmedTexturesForImageData(entityData.image.images[imageKey]);
                    }
                }
            }
        }
    }
}


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
        .add(imagesToLoad)
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

            trimTextures();

            var blueprintContainer = null;

            $.ajax({
                dataType: "json",
                url:      "/blueprint",
                data:     [],
                success:  function (data) {
                    blueprintContainer = drawBlueprint(stage, data);
                    FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);

                    stage.addChild(blueprintContainer);
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
