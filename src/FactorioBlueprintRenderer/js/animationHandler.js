const $ = require("jquery");

module.exports = {
    onSecondTickListeners:   [],
    currentFrame:            0,
    currentSecond:           0,
    clear:                   function () {
        this.onSecondTickListeners = [];
    },
    tick:                    function () {
        var that = this;

        this.currentFrame++;
        if (this.currentFrame === 60) {
            $.each(this.onSecondTickListeners, function (_, listener) {
                listener(that.currentSecond);
            });
            this.currentSecond++;
            this.currentFrame = 0;
        }
    },
    addOnSecondTickListener: function (listener) {
        this.onSecondTickListeners.push(listener);
    },
};