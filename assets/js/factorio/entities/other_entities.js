module.exports = function () {
    return {
        'beacon':     {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/beacon/beacon-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'animated',
                        path: 'base/graphics/entity/beacon/beacon-antenna.png',
                        cols: 8,
                        rows: 4,
                        from: 0,
                        to:   31,
                        x:    19,
                        y:    -34
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
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
                        path: 'base/graphics/entity/small-lamp/light-off.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/small-lamp/light-on-patch.png',
                        x:    3,
                        y:    -10
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -18, y: -10}
        },
        'roboport':   {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/roboport/roboport-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/roboport/roboport-base-animation.png',
                        cols:   8,
                        rows:   1,
                        number: 0,
                        x:      15,
                        y:    -18
                    }
                ]
            },
            gridSize: {w:4, h: 4},
            offset:   {x: 0, y: 0}
        }
    };
}