module.exports = function () {
    return {
        'small-electric-pole':  {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/small-electric-pole/small-electric-pole.png',
                number: 0,
                cols:   4,
                rows:   1
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -10, y: -74}
        },
        'medium-electric-pole': {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/medium-electric-pole/medium-electric-pole.png',
                number: 0,
                cols:   4,
                rows:   1
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: -90}
        },
        'big-electric-pole':    {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/big-electric-pole/big-electric-pole.png',
                number: 0,
                rows:   1,
                cols:   4
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: -5, y: -96}
        },
        'substation':           {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/substation/substation.png',
                number: 0,
                rows:   1,
                cols:   4
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: -5, y: -75}
        }
    };
}