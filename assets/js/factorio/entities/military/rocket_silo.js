module.exports = function () {
    return {
        'rocket-silo': {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/rocket-silo/04-door-back.png',
                        x:    90,
                        y:    90
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/rocket-silo/05-door-front.png',
                        x:    35,
                        y:    100
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/rocket-silo/06-rocket-silo.png',
                        x:    0,
                        y:    0
                    }
                ]
            },
            gridSize: {w: 9, h: 9},
            offset:   {x: -4, y: -10}
        },
    };
}