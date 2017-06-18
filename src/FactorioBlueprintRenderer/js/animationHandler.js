class AnimationHandler {
    constructor() {
        this.onSecondTickListeners =   [];
        this.currentFrame =            0;
        this.currentSecond =           0;
    }
    clear() {
        this.onSecondTickListeners = [];
    }
    tick() {
        this.currentFrame++;
        if (this.currentFrame === 60) {
            this.onSecondTickListeners.forEach((listener) => {
                listener(this.currentSecond);
            });
            this.currentSecond++;
            this.currentFrame = 0;
        }
    }
    addOnSecondTickListener(listener) {
        this.onSecondTickListeners.push(listener);
    }
}

module.exports = AnimationHandler;