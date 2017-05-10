var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.zoomAndPanHandler = {
    MAX_SCALE:             1.5,
    minScale:              1,
    pixiContainer:         null,
    lastPosition:          null,
    canvasWidth:           0,
    canvasHeight:          0,
    pixiContainerWidth:    0,
    pixiContainerHeight:   0,
    zoom:                  function (zoomMultiplier, x, y) {
        var worldPosition = {
            x: (x - this.pixiContainer.x) / this.pixiContainer.scale.x,
            y: (y - this.pixiContainer.y) / this.pixiContainer.scale.y
        };
        this.pixiContainer.scale.x *= zoomMultiplier;
        this.pixiContainer.scale.y *= zoomMultiplier;
        this.clampZoom();
        var newScreenPosition = {
            x: worldPosition.x * this.pixiContainer.scale.x + this.pixiContainer.x,
            y: worldPosition.y * this.pixiContainer.scale.y + this.pixiContainer.y
        };
        this.pixiContainer.x -= newScreenPosition.x - x;
        this.pixiContainer.y -= newScreenPosition.y - y;
        this.clampPosition();
    },
    clampZoom:             function () {
        if (this.pixiContainer.scale.x > this.MAX_SCALE) {
            this.pixiContainer.scale.x = this.MAX_SCALE;
        }
        if (this.pixiContainer.scale.x < this.minScale) {
            this.pixiContainer.scale.x = this.minScale;
        }
        if (this.pixiContainer.scale.y > this.MAX_SCALE) {
            this.pixiContainer.scale.y = this.MAX_SCALE;
        }
        if (this.pixiContainer.scale.y < this.minScale) {
            this.pixiContainer.scale.y = this.minScale;
        }
    },
    clampPosition:         function () {
        if (this.pixiContainer.x > 0) {
            this.pixiContainer.x = 0;
        }
        if (this.pixiContainer.y > 0) {
            this.pixiContainer.y = 0;
        }
        var minX = this.canvasWidth - (this.pixiContainerWidth * this.pixiContainer.scale.x);
        var minY = this.canvasHeight - (this.pixiContainerHeight * this.pixiContainer.scale.y);
        if (this.pixiContainer.x < minX) {
            this.pixiContainer.x = minX;
        }
        if (this.pixiContainer.y < minY) {
            this.pixiContainer.y = minY;
        }
        var worldPosition = {
            x: this.pixiContainer.x,
            y: this.pixiContainer.y
        };
    },
    handleKeyboardPanning: function () {
        if (!this.pixiContainer) {
            return;
        }

        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.W)) {
            this.pixiContainer.y += 10;
            if (this.pixiContainer.y > 0) {
                this.pixiContainer.y = 0;
            }
        }
        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.A)) {
            this.pixiContainer.x += 10;
            if (this.pixiContainer.x > 0) {
                this.pixiContainer.x = 0;
            }
        }
        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.S)) {
            this.pixiContainer.y -= 10;
        }
        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.D)) {
            this.pixiContainer.x -= 10;
        }

        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.dash)
            || FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.sub)) {
           this.zoom(0.99, this.canvasWidth / 2, this.canvasHeight / 2);
        }

        if (FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.equal)
            || FactorioBlueprintReader.keyboardHandler.isPressed(FactorioBlueprintReader.keyboardHandler.add)) {
            this.zoom(1.01, this.canvasWidth / 2, this.canvasHeight / 2);
        }

        this.clampZoom();
        this.clampPosition();
    },
    onMouseWheel:          function (event) {
        if (!this.pixiContainer) {
            return;
        }
        var zoomMultiplier = event.deltaY > 0 ? 1.1 : 0.9;
        this.zoom(zoomMultiplier, event.offsetX, event.offsetY);
    },
    onMouseDown:           function (event) {
        this.lastPosition = {x: event.offsetX, y: event.offsetY};
    },
    onMouseUp:             function (event) {
        this.lastPosition = null;
    },
    onMouseOut:            function (event) {
        this.lastPosition = null;
    },
    onMouseMove:           function (event) {
        if (!this.lastPosition || !this.pixiContainer) {
            return;
        }
        this.pixiContainer.x += (event.offsetX - this.lastPosition.x);
        this.pixiContainer.y += (event.offsetY - this.lastPosition.y);
        this.lastPosition = {x: event.offsetX, y: event.offsetY};
        this.clampPosition();
    },
    setContainer:          function (container) {
        this.pixiContainer = container;
        this.pixiContainerWidth = this.pixiContainer.width / this.pixiContainer.scale.x;
        this.pixiContainerHeight = this.pixiContainer.height / this.pixiContainer.scale.y;
        this.minScale = container.scale.x;
    },
    init:                  function (canvas) {
        $(canvas).mousewheel(this.onMouseWheel.bind(this));
        $(canvas).mousedown(this.onMouseDown.bind(this));
        $(canvas).mouseup(this.onMouseUp.bind(this));
        $(canvas).mouseout(this.onMouseOut.bind(this));
        $(canvas).mousemove(this.onMouseMove.bind(this));
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }
};