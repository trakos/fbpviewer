const $ = require("jquery");

module.exports = {
    alt:         18,
    W:           87,
    A:           65,
    S:           83,
    D:           68,
    equal:       187,
    dash:        189,
    num_add:     107,
    num_sub:     109,
    pressedKeys: {},
    downHandler: function (event) {
        this.pressedKeys[event.which] = true;
    },
    upHandler:   function (event) {
        this.pressedKeys[event.which] = false;
    },
    isPressed:   function (keyCode) {
        return this.pressedKeys[keyCode] || false;
    },
    init:        function () {
        $(window).keydown(this.downHandler.bind(this));
        $(window).keyup(this.upHandler.bind(this));
    }
};