var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.iconCropper = {
    init:               function () {
        this.renderer = PIXI.autoDetectRenderer(32, 32, {antialias: true, forceFXAA: true});
        this.renderer.backgroundColor = 0xFFFFFF;


        $("#main-site-container").get(0).appendChild(this.renderer.view);

        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);
        $(this.renderer.view).hide();
    },
    createIconURL: function (spriteLayers) {
        var tmpContainer = new PIXI.Container();
        $.each(spriteLayers, function(layerNumber, sprite) {
            tmpContainer.addChild(sprite);
        });
        tmpContainer.x = 16;
        tmpContainer.y = 16;
        this.stage.addChild(tmpContainer);
        this.renderer.render(this.stage);

        var src = this.renderer.view.toDataURL();

        this.stage.removeChild(tmpContainer);

        return src;
    }
};