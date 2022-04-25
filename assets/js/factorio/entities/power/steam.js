module.exports = function () {
    return {
        'boiler':       {
            directions: {
                2: {
                    image:    {
                        type: 'sprite',
                        path: 'base/graphics/entity/boiler/boiler-E-idle.png'
                    },
                    gridSize: {w: 2, h: 3},
                    offset:   {x: -28, y: -28}
                },
                4: {
                    image:    {
                        type: 'sprite',
                        path: 'base/graphics/entity/boiler/boiler-S-idle.png'
                    },
                    gridSize: {w: 3, h: 2},
                    offset:   {x: -14, y: -2}
                },
                6: {
                    image:    {
                        type: 'sprite',
                        path: 'base/graphics/entity/boiler/boiler-W-idle.png'
                    },
                    gridSize: {w: 2, h: 3},
                    offset:   {x: -12, y: -10}
                }
            },
            image:      {
                type: 'sprite',
                path: 'base/graphics/entity/boiler/boiler-N-idle.png'
            },
            gridSize:   {w: 3, h: 2},
            offset:     {x: -20, y: -24}
        },
        'steam-engine': {
            directions: {
                2: {
                    image:    {
                        type:   'trim',
                        path:   'base/graphics/entity/steam-engine/steam-engine-H.png',
                        cols:   8,
                        rows:   4,
                        number: 0
                    },
                    gridSize: {w: 5, h: 3},
                    offset:   {x: -10, y: -20}
                }
            },
            image:      {
                type:   'trim',
                path:   'base/graphics/entity/steam-engine/steam-engine-V.png',
                cols:   8,
                rows:   4,
                number: 0
            },
            gridSize:   {w: 3, h: 5},
            offset:     {x: 0, y: -24}
        }
    };
}