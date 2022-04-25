module.exports = function () {
    return {
        'beacon':     {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/beacon/beacon-bottom.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/beacon/beacon-top.png',
                        x:    32,
                        y:    -7
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -5, y: 0}
        },
        'lab':        {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/lab/lab.png',
                number: 0,
                cols:   11,
                rows:   3
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 5}
        },
        'small-lamp': {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/small-lamp/lamp.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/small-lamp/lamp-light.png',
                        x:    0,
                        y:    -15
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -5, y: 0}
        },
        'roboport':   {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/roboport/roboport-base.png',
                        x:    10,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/roboport/roboport-base-animation.png',
                        cols:   8,
                        rows:   1,
                        number: 0,
                        x:      25,
                        y:      -18
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/roboport/roboport-door-down.png',
                        cols:   16,
                        rows:   1,
                        number: 0,
                        x:      40,
                        y:      39
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/roboport/roboport-door-up.png',
                        cols:   16,
                        rows:   1,
                        number: 0,
                        x:      40,
                        y:      20
                    }
                ]
            },
            gridSize: {w: 4, h: 4},
            offset:   {x: 0, y: 0}
        }
    };
}