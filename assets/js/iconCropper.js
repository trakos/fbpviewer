const forEach = require("lodash.foreach");

class IconCropper {
    init(domContainer) {
        this.renderer = PIXI.autoDetectRenderer(32, 32, {antialias: true, forceFXAA: true});
        this.renderer.backgroundColor = 0xFFFFFF;

        domContainer.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);
        $(this.renderer.view).hide();
    }
    createIconURL(spriteLayers) {
        var tmpContainer = new PIXI.Container();
        forEach(spriteLayers, function(sprite, layerNumber) {
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
}

module.exports = IconCropper;