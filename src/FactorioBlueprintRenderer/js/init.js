const $ = require("jquery");
window.$ = window.jQuery = $;
const Hammer = require("hammerjs");
window.Hammer = Hammer;
require("bootstrap");
require("jquery-mousewheel");
const forEach = require("lodash.foreach");
const BootstrapDialog = require("bootstrap3-dialog");
const PIXI = require("pixi.js");
const createColorFillShader = require("./pixi/createColorFillShader");
const createDropShadowFilter = require("./pixi/createDropShadowFilter");

const FactorioBlueprintReader = require("./factorioBlueprintReader");
const AnimationHandler = require("./animationHandler");
const BlueprintRenderer = require("./blueprintRenderer");
const IconCropper = require("./iconCropper");
const KeyboardHandler = require("./keyboardHandler");
const ZoomAndPanHandler = require("./zoomAndPanHandler");
const Loader = require("./images/loader");

global.FBR_DEV = 0;
global.FBR_IMAGES_PREFIX = FBR_DEV ? "/images/factorio/" : "images/factorio/";
global.FBR_PIXELS_PER_TILE = 32;

global.FBR_CANVAS_WIDTH;
global.FBR_CANVAS_HEIGHT;
global.FBR_REDRAW_FUNC;
global.ColorFillShader;

$(function () {
    ColorFillShader = createColorFillShader();
    createDropShadowFilter();

    const STATUS_WIDTH = 100;
    const STATUS_HEIGHT = 20;

    FBR_CANVAS_WIDTH = $("#main-site-container").width() - 5;
    FBR_CANVAS_HEIGHT = $(window).height() - $(".nav").height() - 5;

    var renderer = PIXI.autoDetectRenderer(FBR_CANVAS_WIDTH, FBR_CANVAS_HEIGHT, {antialias: true, forceFXAA: true});
    renderer.backgroundColor = 0x000000;

    $("#main-site-container").get(0).appendChild(renderer.view);

    const factorioBlueprintReader = new FactorioBlueprintReader();
    factorioBlueprintReader.loadEntities();

    const animationHandler = new AnimationHandler();
    const keyboardHandler = new KeyboardHandler();
    const loader = new Loader(factorioBlueprintReader);

    const zoomAndPanHandler = new ZoomAndPanHandler(keyboardHandler);
    zoomAndPanHandler.init(renderer.view);

    const iconCropper = new IconCropper();
    iconCropper.init($("#main-site-container").get(0));

    const blueprintRenderer = new BlueprintRenderer(factorioBlueprintReader, animationHandler, zoomAndPanHandler, keyboardHandler);

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

    zoomAndPanHandler.setOnMousePositionChanged(function (x, y) {
        statusText.text = '(' + Math.floor(x / FBR_PIXELS_PER_TILE) + ', ' + Math.floor(y / FBR_PIXELS_PER_TILE) + ')';
    });

    var gameContainer = new PIXI.Container();

    PIXI.loader
        .add(FBR_DEV ? loader.getImagesToLoad() : '/images/spritesheet.json')
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
                loader.prepareTrimmedTextures();
            }

            function gameLoop() {
                requestAnimationFrame(gameLoop);
                zoomAndPanHandler.handleKeyboardPanning();
                animationHandler.tick();
                renderer.render(stage);
            }

            gameLoop();

            var blueprintContainer = null;
            var currentBlueprintString = FBR_INITIAL_BLUEPRINT;
            var currentBlueprintIndex = 0;
            var blueprintData = factorioBlueprintReader.parse(currentBlueprintString);
            blueprintContainer = new PIXI.Container();
            zoomAndPanHandler.setContainer(blueprintContainer);
            gameContainer.addChild(blueprintContainer);

            function redraw() {
                var containerToDestroy = blueprintContainer;
                setTimeout(function () {
                    gameContainer.removeChild(containerToDestroy);
                    containerToDestroy.destroy({children: true});
                    containerToDestroy = null;
                }, 0);

                factorioBlueprintReader.loadEntities();
                if (blueprintData.data.blueprint) {
                    $("#blueprint-recipe-selector").hide();
                    blueprintContainer = blueprintRenderer.renderBlueprint(renderer, stage, blueprintData.data);
                } else if (blueprintData.data.blueprint_book) {
                    $("#blueprint-recipe-selector").show();
                    blueprintContainer = blueprintRenderer.renderBlueprint(renderer, stage, blueprintData.data.blueprint_book.blueprints[currentBlueprintIndex]);
                    $('#blueprint-recipe-selector ul').find('li').remove();
                    forEach(blueprintData.data.blueprint_book.blueprints, function (value, key) {
                        var icons = '';
                        for (var k = 0; k < 4; k++) {
                            var icon = value.blueprint.icons[k];
                            if (icon) {
                                var signalName = icon.signal.name;
                                if (factorioBlueprintReader.icons[signalName]) {
                                    var imageSpec = factorioBlueprintReader.icons[signalName].image;
                                    var iconSprites = blueprintRenderer.createEntityLayers(imageSpec, {});
                                    var iconSrc = iconCropper.createIconURL(iconSprites);
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
                zoomAndPanHandler.setContainer(blueprintContainer);

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
                                var parsed = factorioBlueprintReader.parse(blueprintString);
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

$(document).on("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.loadingMessage = false;
});
