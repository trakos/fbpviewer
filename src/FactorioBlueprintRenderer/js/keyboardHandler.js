const $ = require("jquery");

class KeyboardHandler {
    constructor() {
        this.keys = {
            alt:         18,
            W:           87,
            A:           65,
            S:           83,
            D:           68,
            equal:       187,
            dash:        189,
            num_add:     107,
            num_sub:     109
        }
        this.pressedKeys = {};

        $(window).keydown(this.downHandler.bind(this));
        $(window).keyup(this.upHandler.bind(this));
    }
    downHandler(event) {
        this.pressedKeys[event.which] = true;
    }
    upHandler(event) {
        this.pressedKeys[event.which] = false;
    }
    isPressed(keyCode) {
        return this.pressedKeys[keyCode] || false;
    }
}

module.exports = KeyboardHandler;