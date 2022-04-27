module.exports = function () {
    return {
        'gate':       {
            directions: {
                2: {
                    image:  {
                        type:   'trim',
                        path:   'base/graphics/entity/gate/gate-horizontal.png',
                        number: 0,
                        cols:   8,
                        rows:   2,
                    },
                    offset: {x: 0, y: -10}
                }
            },
            image:      {
                type:   'trim',
                path:   'base/graphics/entity/gate/gate-vertical.png',
                number: 0,
                cols:   8,
                rows:   2,
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -4, y: -28}
        },
        'stone-wall': {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/wall/wall-t.png',
                number: 0,
                cols:   2,
                rows:   1
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: -15}
        },
    };
}