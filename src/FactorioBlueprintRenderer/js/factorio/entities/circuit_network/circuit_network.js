const { createEntitiesFunctions } = require("../index");

createEntitiesFunctions.push(function () {
    return {
        'power-switch':         {
            image:    {
                type:   'trim',
                path:   'entity/power-switch/power-switch.png',
                number: 0,
                cols:   2,
                rows:   3
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: -10, y: 0}
        },
        'programmable-speaker': {
            image:    {
                type:   'container',
                images: [
                    {
                        type:  'sprite',
                        path:  'entity/programmable-speaker/programmable-speaker-shadow.png',
                        alpha: 0.5,
                        x:     10,
                        y:     70
                    },
                    {
                        type: 'sprite',
                        path: 'entity/programmable-speaker/programmable-speaker.png',
                        x:    0,
                        y:    0
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -2, y: -66}
        }
    }
});