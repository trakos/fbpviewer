module.exports = function () {
    return {
        'gate':                   {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'entity/gate/gate-base-horizontal.png',
                                x:    0,
                                y:    15
                            },
                            {
                                type:   'trim',
                                path:   'entity/gate/gate-horizontal.png',
                                number: 0,
                                cols:   8,
                                rows:   2,
                                x:      0,
                                y:      -4
                            }
                        ]
                    },
                    offset:   {x: 0, y: -5}
                }
            },
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/gate/gate-base-vertical.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'entity/gate/gate-vertical.png',
                        number: 0,
                        cols:   8,
                        rows:   2,
                        x:      6,
                        y:      -28
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'stone-wall':             {
            image:    {
                type: 'sprite',
                path: 'entity/stone-wall/wall-single.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 5, y: -15}
        },


    };
}