module.exports = function () {
    return {
        'flamethrower-turret': {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-down.png',
                                x:    -11,
                                y:    -31
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/flamethrower-turret/flamethrower-turret-base-east.png',
                                x:    -6,
                                y:    -3
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-up.png',
                                x:    -12,
                                y:    31
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 45,
                                x:      33,
                                y:      -20
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                                cols:           8,
                                rows:           4,
                                from:           0,
                                to:             31,
                                animationSpeed: 0.9,
                                alpha:          0.8,
                                scale:          {x: 0.5, y: 0.5},
                                x:              106,
                                y:              -5
                            }
                        ]
                    },
                    gridSize: {w: 3, h: 2},
                    offset:   {x: -6, y: 5}
                },
                4: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-left.png',
                                x:    25,
                                y:    -14
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-right.png',
                                x:    -18,
                                y:    -14
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/flamethrower-turret/flamethrower-turret-base-south.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 30,
                                x:      -3,
                                y:      13
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                                cols:           8,
                                rows:           4,
                                from:           0,
                                to:             31,
                                animationSpeed: 0.9,
                                scale:          {x: 0.5, y: 0.5},
                                alpha:          0.8,
                                x:              32,
                                y:              55
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 3},
                    offset:   {x: -3, y: 0}
                },
                6: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-down.png',
                                x:    42,
                                y:    -31
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/pipe/pipe-ending-up.png',
                                x:    42,
                                y:    18
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/flamethrower-turret/flamethrower-turret-base-west.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 15,
                                x:      0,
                                y:      -20
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                                cols:           8,
                                rows:           4,
                                from:           0,
                                to:             31,
                                animationSpeed: 0.9,
                                alpha:          0.8,
                                scale:          {x: 0.5, y: 0.5},
                                x:              0,
                                y:              -5
                            }
                        ]
                    },
                    gridSize: {w: 3, h: 2},
                    offset:   {x: -6, y: 5}
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/pipe/pipe-ending-left.png',
                        x:    32,
                        y:    34
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/pipe/pipe-ending-right.png',
                        x:    -14,
                        y:    34
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/flamethrower-turret/flamethrower-turret-base-north.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                        cols:   5,
                        rows:   12,
                        number: 0,
                        x:      -3,
                        y:      -37
                    },
                    {
                        type:           'animated',
                        path:           'base/graphics/entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                        cols:           8,
                        rows:           4,
                        from:           0,
                        to:             31,
                        animationSpeed: 0.9,
                        scale:          {x: 0.5, y: 0.5},
                        alpha:          0.8,
                        x:              35,
                        y:              -54
                    }
                ]
            },
            gridSize:   {w: 2, h: 3},
            offset:     {x: -10, y: 13}
        },
        'gun-turret':          {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/gun-turret/gun-turret-raising.png',
                                number: 5,
                                cols:   5,
                                rows:   4,
                                x:      4,
                                y:      -26
                            }
                        ]
                    }
                },
                4: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/gun-turret/gun-turret-raising.png',
                                number: 10,
                                cols:   5,
                                rows:   4,
                                x:      4,
                                y:      -26
                            }
                        ]
                    }
                },
                6: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/gun-turret/gun-turret-raising.png',
                                number: 15,
                                cols:   5,
                                rows:   4,
                                x:      4,
                                y:      -26
                            }
                        ]
                    }
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/gun-turret/gun-turret-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/gun-turret/gun-turret-raising.png',
                        number: 0,
                        cols:   5,
                        rows:   4,
                        x:      4,
                        y:      -26
                    }
                ]
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: -4, y: 4}
        },
        'laser-turret':        {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/laser-turret/laser-turret-base.png',
                                x:    -2,
                                y:    6
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/laser-turret/laser-turret-raising.png',
                                number: 16,
                                cols:   16,
                                rows:   4,
                                x:      0,
                                y:      -30
                            }
                        ]
                    }
                },
                4: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/laser-turret/laser-turret-base.png',
                                x:    -2,
                                y:    6
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/laser-turret/laser-turret-raising.png',
                                number: 32,
                                cols:   16,
                                rows:   4,
                                x:      0,
                                y:      -30
                            }
                        ]
                    }
                },
                6: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/laser-turret/laser-turret-base.png',
                                x:    -2,
                                y:    6
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/laser-turret/laser-turret-raising.png',
                                number: 48,
                                cols:   16,
                                rows:   4,
                                x:      0,
                                y:      -30
                            }
                        ]
                    }
                },
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/laser-turret/laser-turret-base.png',
                        x:    -2,
                        y:    6
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/laser-turret/laser-turret-raising.png',
                        number: 0,
                        cols:   16,
                        rows:   4,
                        x:      0,
                        y:      -30
                    }
                ]
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: 0, y: 0}
        },
        'artillery-turret':        {
            image:      {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/artillery-turret/artillery-turret-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/artillery-wagon/artillery-wagon-cannon-base-1.png',
                        number: 0,
                        cols:   4,
                        rows:   4,
                        x:      -40,
                        y:      -80
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: -3, y: -5}
        }
    };
}