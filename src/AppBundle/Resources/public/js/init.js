const FBR_DEV = 0;
const FBR_IMAGES_PREFIX = FBR_DEV ? "/images/factorio/" : "images/factorio/";
const FBR_PIXELS_PER_TILE = 32;

var FBR_CANVAS_WIDTH;
var FBR_CANVAS_HEIGHT;
var FBR_REDRAW_FUNC;
var ColorFillShader;

$(function () {
    ColorFillShader = createColorFillShader();
    createDropShadowFilter();

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
    FactorioBlueprintReader.iconCropper.init();

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
        .add(FBR_DEV ? FactorioBlueprintReader.Loader.getImagesToLoad() : '/images/spritesheet.json')
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

            if (FBR_DEV) {
                FactorioBlueprintReader.Loader.prepareTrimmedTextures();
            }

            function gameLoop() {
                requestAnimationFrame(gameLoop);
                FactorioBlueprintReader.zoomAndPanHandler.handleKeyboardPanning();
                FactorioBlueprintReader.animationHandler.tick();
                renderer.render(stage);
            }

            gameLoop();

            var blueprintContainer = null;
            var currentBlueprintString = FBR_INITIAL_BLUEPRINT;
            var currentBlueprintIndex = 0;

            var blueprintData = FactorioBlueprintReader.parse(currentBlueprintString);
            blueprintContainer = new PIXI.Container();
            FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);
            gameContainer.addChild(blueprintContainer);

            function redraw() {
                var containerToDestroy = blueprintContainer;
                setTimeout(function () {
                    gameContainer.removeChild(containerToDestroy);
                    containerToDestroy.destroy({children: true});
                    containerToDestroy = null;
                }, 0);

                loadEntities();
                if (blueprintData.data.blueprint) {
                    $("#blueprint-recipe-selector").hide();
                    blueprintContainer = FactorioBlueprintReader.blueprintRenderer.renderBlueprint(renderer, stage, blueprintData.data);
                } else if (blueprintData.data.blueprint_book) {
                    $("#blueprint-recipe-selector").show();
                    blueprintContainer = FactorioBlueprintReader.blueprintRenderer.renderBlueprint(renderer, stage, blueprintData.data.blueprint_book.blueprints[currentBlueprintIndex]);
                    $('#blueprint-recipe-selector ul').find('li').remove();
                    $.each(blueprintData.data.blueprint_book.blueprints, function (key, value) {
                        var icons = '';
                        for (var k = 0; k < 4; k++) {
                            var icon = value.blueprint.icons[k];
                            if (icon) {
                                var signalName = icon.signal.name;
                                if (FactorioBlueprintReader.icons[signalName]) {
                                    var imageSpec = FactorioBlueprintReader.icons[signalName].image;
                                    var iconSprites = FactorioBlueprintReader.blueprintRenderer.createEntityLayers(imageSpec, {});
                                    var iconSrc = FactorioBlueprintReader.iconCropper.createIconURL(iconSprites);
                                    icons += '<img src="' + iconSrc + '" />';
                                    continue;

                                    /*if (imageSpec.type == 'sprite') {
                                     icons += '<img src="' + FBR_IMAGES_PREFIX + imageSpec.path + '" />';
                                     continue;
                                     } else {
                                     console.log('Icon complex', signalName);
                                     }*/
                                } else {
                                    console.log('Icon not found', signalName);
                                }
                            } else {
                                icons += '<span style="margin-right: 32px;"></span>';
                            }
                        }
                        var option = $('<li><a href="#">' + icons + ' ' + value.blueprint.label + '</a></li>');
                        option.click(function () {
                            currentBlueprintIndex = key;
                            redraw();
                        });
                        if (key == currentBlueprintIndex) {
                            option.addClass('active');
                        }
                        $('#blueprint-recipe-selector ul').append(option);
                    });
                }
                FactorioBlueprintReader.zoomAndPanHandler.setContainer(blueprintContainer);

                gameContainer.addChild(blueprintContainer);
            }

            FBR_REDRAW_FUNC = redraw;
            setTimeout(function () {
                redraw();
            }, 0);
            $("#show-blueprint-string-button").click(function () {
                BootstrapDialog.show({
                    title:   "Blueprint string",
                    message: '<div class="form-group"><textarea id="factorio-blueprint-output" class="form-control" onClick="this.setSelectionRange(0, this.value.length)" rows="5">' + currentBlueprintString + '</textarea></div>',
                    onshown: function (dialogRef) {
                        $('#factorio-blueprint-output').focus();
                        $('#factorio-blueprint-output').select();
                    }
                });
            });
            $("#load-blueprint-button").click(function () {
                BootstrapDialog.show({
                    title:   "Paste blueprint",
                    message: '<div class="input-group">' +
                             '<span class="input-group-addon">BP</span>' +
                             '<input id="factorio-blueprint-input" type="text" class="form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Paste your blueprint here">' +
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
                            if (blueprintData.data.blueprint_book && blueprintData.data.blueprint_book.length == 0) {
                                alert("You can't import an empty book!");
                                return;
                            }
                            dialogRef.close();
                            blueprintData = parsed;
                            currentBlueprintIndex = 0;
                            currentBlueprintString = blueprintString;
                            redraw();
                        }
                    }, {
                        label:  'Cancel',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }],
                    onshown: function (dialogRef) {
                        $('#factorio-blueprint-input').focus();
                        $('#factorio-blueprint-input').select();
                    }
                });
            });
            $("#share-blueprint-button").click(function () {
                var dialogRef = BootstrapDialog.show({
                    message: '<p>Generating, please wait...</p>',
                    buttons: [{
                        label:  'Close',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }]
                });

                dialogRef.enableButtons(false);
                dialogRef.setClosable(false);

                $.ajax('/share', {
                    type:    'POST',
                    data:    currentBlueprintString,
                    success: function (data, status, xhr) {
                        dialogRef.getModalBody().html('<div class="input-group">' +
                            '<span class="input-group-addon">URL</span>' +
                            '<input readonly="readonly" id="factorio-blueprint-url" onClick="this.setSelectionRange(0, this.value.length)" type="text" class="form-control" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="" value="' + data.url + '">' +
                            '</div>');
                        dialogRef.enableButtons(true);
                        dialogRef.setClosable(true);
                        $('#factorio-blueprint-url').focus();
                        $('#factorio-blueprint-url').select();
                    },
                    error:   function (jqXhr, textStatus, errorMessage) {
                        alert('Failed to create URL');
                        dialogRef.close();
                    }
                });
            });
        });
});
