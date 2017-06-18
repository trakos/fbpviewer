module.exports = function () {
    return {
        'centrifuge':      {
            image:    {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/centrifuge/centrifuge-A.png',
                        number: 0,
                        cols:   8,
                        rows:   8,
                        x:      0,
                        y:      22
                    },
                    {
                        type:   'trim',
                        path:   'entity/centrifuge/centrifuge-B.png',
                        number: 0,
                        cols:   8,
                        rows:   8,
                        x:      44,
                        y:      28
                    },
                    {
                        type:   'trim',
                        path:   'entity/centrifuge/centrifuge-C.png',
                        number: 0,
                        cols:   8,
                        rows:   8,
                        x:      0,
                        y:      0
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -12, y: -32}
        },
        'heat-exchanger':  {
            directions: {
                2: {
                    image:    {
                        type: 'sprite',
                        path: 'entity/heat-exchanger/heatex-E-idle.png'
                    },
                    gridSize: {w: 2, h: 3},
                    offset:   {x: -22, y: -26}
                },
                4: {
                    image:    {
                        type: 'sprite',
                        path: 'entity/heat-exchanger/heatex-S-idle.png'
                    },
                    gridSize: {w: 3, h: 2},
                    offset:   {x: -14, y: -8}
                },
                6: {
                    image:    {
                        type: 'sprite',
                        path: 'entity/heat-exchanger/heatex-W-idle.png'
                    },
                    gridSize: {w: 2, h: 3},
                    offset:   {x: -15, y: -14}
                }
            },
            image:      {
                type: 'sprite',
                path: 'entity/heat-exchanger/heatex-N-idle.png'
            },
            gridSize:   {w: 3, h: 2},
            offset:     {x: -18, y: -24}
        },
        'heat-pipe':       {
            image:    {
                type: 'sprite',
                path: 'entity/heat-pipe/heat-pipe-t-1.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'nuclear-reactor': {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/nuclear-reactor/reactor.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'sprite',
                        path: 'entity/nuclear-reactor/reactor-pipes.png',
                        x:    0,
                        y:    0
                    }
                ]
            },
            gridSize: {w: 5, h: 5},
            offset:   {x: 0, y: 0}
        },
        'steam-turbine':   {
            directions: {
                2: {
                    image:    {
                        type:   'trim',
                        path:   'entity/steam-turbine/steam-turbine-H.png',
                        cols:   4,
                        rows:   2,
                        number: 0
                    },
                    gridSize: {w: 5, h: 3},
                    offset:   {x: 0, y: -10}
                }
            },
            image:      {
                type:   'trim',
                path:   'entity/steam-turbine/steam-turbine-V.png',
                cols:   4,
                rows:   2,
                number: 0
            },
            gridSize:   {w: 3, h: 5},
            offset:     {x: 0, y: 0}

        },
    };
}