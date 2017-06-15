const keyboardHandler = require("./keyboardHandler");

module.exports = {
    MAX_SCALE:                 3,
    minScale:                  1,
    pixiContainer:             null,
    lastPosition:              null,
    canvasWidth:               0,
    canvasHeight:              0,
    pixiContainerWidth:        0,
    pixiContainerHeight:       0,
    onMousePositionChanged:    function (x, y) {
    },
    onMouseClickListener:      function (x, y) {
    },
    zoom:                      function (zoomMultiplier, x, y) {
        var worldPosition = this.getWorldPosition(x, y);
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
    clampZoom:                 function () {
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
    clampPosition:             function () {
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
    getWorldPosition:          function (mouseX, mouseY) {
        return {
            x: (mouseX - this.pixiContainer.x) / this.pixiContainer.scale.x,
            y: (mouseY - this.pixiContainer.y) / this.pixiContainer.scale.y
        };
    },
    handleKeyboardPanning:     function () {
        if (!this.pixiContainer) {
            return;
        }

        if (keyboardHandler.isPressed(keyboardHandler.W)) {
            this.pixiContainer.y += 10;
            if (this.pixiContainer.y > 0) {
                this.pixiContainer.y = 0;
            }
        }
        if (keyboardHandler.isPressed(keyboardHandler.A)) {
            this.pixiContainer.x += 10;
            if (this.pixiContainer.x > 0) {
                this.pixiContainer.x = 0;
            }
        }
        if (keyboardHandler.isPressed(keyboardHandler.S)) {
            this.pixiContainer.y -= 10;
        }
        if (keyboardHandler.isPressed(keyboardHandler.D)) {
            this.pixiContainer.x -= 10;
        }

        if (keyboardHandler.isPressed(keyboardHandler.dash)
            || keyboardHandler.isPressed(keyboardHandler.num_sub)) {
            this.zoom(0.99, this.canvasWidth / 2, this.canvasHeight / 2);
        }

        if (keyboardHandler.isPressed(keyboardHandler.equal)
            || keyboardHandler.isPressed(keyboardHandler.num_add)) {
            this.zoom(1.01, this.canvasWidth / 2, this.canvasHeight / 2);
        }

        this.clampZoom();
        this.clampPosition();
    },
    onMouseWheel:              function (event) {
        if (!this.pixiContainer) {
            return;
        }
        var zoomMultiplier = event.deltaY > 0 ? 1.1 : 0.9;
        this.zoom(zoomMultiplier, event.offsetX, event.offsetY);
    },
    onMouseDown:               function (event) {
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        if (!offsetX) {
            var target = event.target || e.srcElement,
            rect = target.getBoundingClientRect(),
            offsetX = event.clientX - rect.left,
            offsetY = event.clientY - rect.top;
        }
        this.lastPosition = {x: offsetX, y: offsetY};
        this.movedBy = 0;
    },
    onMouseUp:                 function (event) {
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        if (!offsetX) {
            var target = event.target || e.srcElement,
                rect = target.getBoundingClientRect(),
                offsetX = event.clientX - rect.left,
                offsetY = event.clientY - rect.top;
        }
        var that = this;
        if (this.lastPosition && this.movedBy < 40) {
            var worldPosition = this.getWorldPosition(offsetX, offsetY);
            setTimeout(function () {
                that.onMouseClickListener(Math.round(worldPosition.x), Math.round(worldPosition.y));
            }, 100);
        }
        this.lastPosition = null;
    },
    onMouseOut:                function (event) {
        this.lastPosition = null;
        this.moved = true;
    },
    onMouseMove:               function (event) {
        var offsetX = event.offsetX;
        var offsetY = event.offsetY;
        if (!offsetX) {
            var target = event.target || e.srcElement,
                rect = target.getBoundingClientRect(),
                offsetX = event.clientX - rect.left,
                offsetY = event.clientY - rect.top;
        }
        if (!this.pixiContainer) {
            return;
        }
        if (this.lastPosition) {
            this.movedBy += Math.pow(offsetX - this.lastPosition.x, 2) + Math.pow(offsetY - this.lastPosition.y, 2);
            this.pixiContainer.x += (offsetX - this.lastPosition.x);
            this.pixiContainer.y += (offsetY - this.lastPosition.y);
            this.lastPosition = {x: offsetX, y: offsetY};
            this.clampPosition();
        }
        var worldPosition = this.getWorldPosition(event.offsetX, event.offsetY);
        this.onMousePositionChanged(Math.round(worldPosition.x), Math.round(worldPosition.y));
    },
    onHammerPinch:             function (event) {
        this.zoom(Math.pow(event.scale, 0.05), event.center.x, event.center.y);
    },
    setContainer:              function (container, keepPosition) {
        this.minScale = container.scale.x;
        this.pixiContainerWidth = container.width / container.scale.x;
        this.pixiContainerHeight = container.height / container.scale.y;
        if (keepPosition && this.pixiContainer) {
            container.x = this.pixiContainer.x;
            container.y = this.pixiContainer.y;
            container.scale.x = this.pixiContainer.scale.x;
            container.scale.y = this.pixiContainer.scale.y;
        }
        this.pixiContainer = container;
    },
    setOnMousePositionChanged: function (listener) {
        this.onMousePositionChanged = listener;
    },
    setOnMouseClickListener:   function (listener) {
        this.onMouseClickListener = listener;
    },
    init:                      function (canvas) {
        $(canvas).mousewheel(this.onMouseWheel.bind(this));
        $(canvas).on('vmousedown', this.onMouseDown.bind(this));
        $(canvas).on('vmouseup', this.onMouseUp.bind(this));
        $(canvas).on('vmouseout', this.onMouseOut.bind(this));
        $(canvas).on('vmousemove', this.onMouseMove.bind(this));
        var hammertime = new Hammer($(canvas).get(0));
        hammertime.get('pinch').set({ enable: true });
        hammertime.on('pinch', this.onHammerPinch.bind(this));
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }
};