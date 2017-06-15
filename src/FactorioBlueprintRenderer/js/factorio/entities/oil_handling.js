module.exports = function () {

    const TILE_SIZE = 32;

    function createPumpjackImage(number, arrowRotation, arrowX, arrowY) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'entity/pumpjack/pumpjack-base.png',
                    number: number,
                    cols:   4,
                    rows:   1,
                    x:      -12,
                    y:      -12
                },
                {
                    type:   'trim',
                    path:   'entity/pumpjack/pumpjack-animation.png',
                    number: 0,
                    cols:   10,
                    rows:   4,
                    x:      -12,
                    y:      -32
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: arrowRotation,
                    x:        arrowX,
                    y:        arrowY
                }
            ]
        };
    }

    function createRefineryImage(number, rotation, arrows) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'entity/oil-refinery/oil-refinery.png',
                    number: number,
                    cols:   4,
                    rows:   1,
                    x:      0,
                    y:      -32
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: rotation,
                    x:        arrows[0].x,
                    y:        arrows[0].y
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: rotation,
                    x:        arrows[1].x,
                    y:        arrows[1].y
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: rotation,
                    x:        arrows[2].x,
                    y:        arrows[2].y
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: rotation,
                    x:        arrows[3].x,
                    y:        arrows[3].y
                },
                {
                    type:     'sprite',
                    path:     'core/fluid-indication-arrow.png',
                    scale:    {x: 0.5, y: 0.5},
                    rotation: rotation,
                    x:        arrows[4].x,
                    y:        arrows[4].y
                }
            ]
        };
    }

    return {

        'chemical-plant': {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 1,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        5,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        79,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        5,
                                y:        84
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        79,
                                y:        84
                            }
                        ]
                    }
                },
                4: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 2,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        5,
                                y:        -5
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        66,
                                y:        -5
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        5,
                                y:        75
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        66,
                                y:        75
                            }
                        ]
                    }
                },
                6: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 3,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        10,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        89,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        10,
                                y:        84
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        89,
                                y:        84
                            }
                        ]
                    }

                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/chemical-plant/chemical-plant.png',
                        number: 0,
                        cols:   4,
                        rows:   1,
                        x:      -20,
                        y:      -25
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        15,
                        y:        8
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        79,
                        y:        8
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        15,
                        y:        90
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        79,
                        y:        90
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: 0, y: 0}
        },
        'oil-refinery':   {
            directions: {
                2: {
                    image: createRefineryImage(1, 0.5, [
                        {x: 10, y: TILE_SIZE + 17},
                        {x: 10, y: TILE_SIZE * 3 + 17},
                        {x: -5 + TILE_SIZE * 5, y: -17 + TILE_SIZE},
                        {x: -5 + TILE_SIZE * 5, y: -17 + TILE_SIZE * 3},
                        {x: -5 + TILE_SIZE * 5, y: -17 + TILE_SIZE * 5}
                    ])
                },
                4: {
                    image: createRefineryImage(2, 1, [
                        {x: 15 + TILE_SIZE * 0, y: -5 + TILE_SIZE * 5},
                        {x: 15 + TILE_SIZE * 2, y: -5 + TILE_SIZE * 5},
                        {x: 15 + TILE_SIZE * 4, y: -5 + TILE_SIZE * 5},
                        {x: 15 + TILE_SIZE * 1, y: 5},
                        {x: 15 + TILE_SIZE * 3, y: 5},
                    ])
                },
                6: {
                    image: createRefineryImage(3, 1.5, [
                        {x: 15, y: -15 + TILE_SIZE * 2},
                        {x: 15, y: -15 + TILE_SIZE * 4},
                        {x: 20 + TILE_SIZE * 4, y: -15 + TILE_SIZE * 1},
                        {x: 20 + TILE_SIZE * 4, y: -15 + TILE_SIZE * 3},
                        {x: 20 + TILE_SIZE * 4, y: -15 + TILE_SIZE * 5}
                    ])
                }
            },
            image:      createRefineryImage(0, 0, [
                {x: 5, y: -15},
                {x: 5 + TILE_SIZE * 2, y: -15},
                {x: 5 + TILE_SIZE * 4, y: -15},
                {x: 5 + TILE_SIZE, y: -15 + TILE_SIZE * 5},
                {x: 5 + TILE_SIZE * 3, y: -15 + TILE_SIZE * 5}
            ]),
            gridSize:   {w: 5, h: 5},
            offset:     {x: 0, y: 0}
        },
        'pumpjack':       {
            directions: {
                2: {
                    image: createPumpjackImage(1, 0.5, 96, 20)
                },
                4: {
                    image: createPumpjackImage(2, 1, 16, 96)
                },
                6: {
                    image: createPumpjackImage(3, 1.5, 0, 64)
                }
            },
            image:      createPumpjackImage(0, 0, 66, -16),
            gridSize:   {w: 3, h: 3},
            offset:     {x: 0, y: 0}
        }
    };
}