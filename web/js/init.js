const FBR_IMAGES_PREFIX = "images/factorio/";
const FBR_PIXELS_PER_TILE = 32;

var FBR_CANVAS_WIDTH;
var FBR_CANVAS_HEIGHT;
var FBR_REDRAW_FUNC;

$(function () {
    function loadEntities() {
        FactorioBlueprintReader.entities = {};

        $.each(FactorioBlueprintReader.createEntitiesFunctions, function (_, func) {
            $.each(func(), function (entityKey, entitySpec) {
                FactorioBlueprintReader.entities[entityKey] = entitySpec;
            });
        });
    }

    loadEntities();

    const STATUS_WIDTH = 100;
    const STATUS_HEIGHT = 20;

    FBR_CANVAS_WIDTH = $("#main-site-container").width() - 5;
    FBR_CANVAS_HEIGHT = $(window).height() - $(".nav").height() - 5;

    var renderer = PIXI.autoDetectRenderer(FBR_CANVAS_WIDTH, FBR_CANVAS_HEIGHT, {antialias: true, forceFXAA: true});
    renderer.backgroundColor = 0x000000;

    $("#main-site-container").get(0).appendChild(renderer.view);

    FactorioBlueprintReader.keyboardHandler.init();
    FactorioBlueprintReader.zoomAndPanHandler.init(renderer.view);

    var stage = new PIXI.Container();
    var graphics = new PIXI.Graphics();
    stage.addChild(graphics);

    var bottomStatus = new PIXI.Container();
    bottomStatus.x = FBR_CANVAS_WIDTH - 100;
    bottomStatus.y = FBR_CANVAS_HEIGHT - 20;

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
        statusText.text = '(' + Math.floor(x / FBR_PIXELS_PER_TILE) + ', ' + Math.floor(y / FBR_PIXELS_PER_TILE) + ')';
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
            graphics.drawRect(20, FBR_CANVAS_HEIGHT / 2 - 20, FBR_CANVAS_WIDTH - 40, 40);

            graphics.beginFill(0x0000FF);
            graphics.drawRect(20, FBR_CANVAS_HEIGHT / 2 - 20, (FBR_CANVAS_WIDTH - 40) / 100 * loader.progress, 40);
        })
        .load(function () {
            stage.removeChild(graphics);
            stage.addChild(gameContainer);
            stage.addChild(bottomStatus);
            graphics = null;

            FactorioBlueprintReader.Loader.prepareTrimmedTextures();

            function gameLoop() {
                requestAnimationFrame(gameLoop);
                FactorioBlueprintReader.zoomAndPanHandler.handleKeyboardPanning();
                renderer.render(stage);
            }

            gameLoop();

            var blueprintContainer = null;

            var blueprintData = FactorioBlueprintReader.parse(FactorioBlueprintReader.TEST_CASES.connected_combinators);
            blueprintContainer = FactorioBlueprintReader.renderBlueprint(stage, blueprintData.data);
            FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);
            gameContainer.addChild(blueprintContainer);

            function redraw() {
                gameContainer.removeChild(blueprintContainer);
                var containerToDestroy = blueprintContainer;
                setTimeout(function () {
                    containerToDestroy.destroy({children: true});
                    containerToDestroy = null;
                }, 0);

                loadEntities();
                blueprintContainer = FactorioBlueprintReader.renderBlueprint(stage, blueprintData.data);
                FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);

                gameContainer.addChild(blueprintContainer);
            }

            FBR_REDRAW_FUNC = redraw;
            $("#load-blueprint-button").click(function () {
                BootstrapDialog.show({
                    title:   "Paste blueprint",
                    message: '<div class="input-group">' +
                             '<span class="input-group-addon">BP</span>' +
                             '<input id="factorio-blueprint-input" type="text" class="form-control" placeholder="Paste your blueprint here">' +
                             '</div>',
                    buttons: [{
                        label:  'Render',
                        action: function (dialogRef) {
                            var blueprintString = $("#factorio-blueprint-input").val();
                            try {
                                var parsed = FactorioBlueprintReader.parse(blueprintString);
                            } catch (e) {
                                alert("Failed parsing the blueprint!");
                                return;
                            }
                            if (!parsed) {
                                alert("Failed parsing the blueprint!");
                                return;
                            }
                            dialogRef.close();
                            blueprintData = parsed;
                            redraw();
                        }
                    }, {
                        label:  'Cancel',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });
            });
        });
});
