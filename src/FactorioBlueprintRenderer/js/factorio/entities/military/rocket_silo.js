const { createEntitiesFunctions } = require("../index");

createEntitiesFunctions.push(function () {
    return {
        'rocket-silo':            {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/rocket-silo/04-05-doors/04-door-back.png',
                        x:    70,
                        y:    190
                    },
                    {
                        type: 'sprite',
                        path: 'entity/rocket-silo/04-05-doors/05-door-front.png',
                        x:    70,
                        y:    190
                    },
                    {
                        type: 'sprite',
                        path: 'entity/rocket-silo/06-silo-base/06-silo-base-day.png',
                        x:    0,
                        y:    0
                    }
                ]
            },
            gridSize: {w: 9, h: 10},
            offset:   {x: -32, y: -32}
        },
    };
});