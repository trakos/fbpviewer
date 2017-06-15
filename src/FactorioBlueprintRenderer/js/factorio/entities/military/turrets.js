const { createEntitiesFunctions } = require("../index");

createEntitiesFunctions.push(function () {
    return {
        'flamethrower-turret': {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'entity/pipe/pipe-ending-down.png',
                                x:    -11,
                                y:    -31
                            },
                            {
                                type: 'sprite',
                                path: 'entity/pipe/pipe-ending-up.png',
                                x:    -12,
                                y:    21
                            },
                            {
                                type: 'sprite',
                                path: 'entity/flamethrower-turret/flamethrower-turret-base-east.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 45,
                                x:      33,
                                y:      -20
                            },
                            {
                                type:           'animated',
                                path:           'entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                                cols:           8,
                                rows:           4,
                                from:           0,
                                to:             31,
                                animationSpeed: 0.9,
                                alpha:          0.8,
                                scale:          {x: 0.5, y: 0.5},
                                x:              102,
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
                                path: 'entity/pipe/pipe-ending-left.png',
                                x:    25,
                                y:    -14
                            },
                            {
                                type: 'sprite',
                                path: 'entity/pipe/pipe-ending-right.png',
                                x:    -18,
                                y:    -14
                            },
                            {
                                type: 'sprite',
                                path: 'entity/flamethrower-turret/flamethrower-turret-base-south.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 30,
                                x:      -3,
                                y:      13
                            },
                            {
                                type:           'animated',
                                path:           'entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
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
                                path: 'entity/pipe/pipe-ending-down.png',
                                x:    42,
                                y:    -31
                            },
                            {
                                type: 'sprite',
                                path: 'entity/pipe/pipe-ending-up.png',
                                x:    42,
                                y:    18
                            },
                            {
                                type: 'sprite',
                                path: 'entity/flamethrower-turret/flamethrower-turret-base-west.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                                cols:   5,
                                rows:   12,
                                number: 15,
                                x:      0,
                                y:      -20
                            },
                            {
                                type:           'animated',
                                path:           'entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
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
                        path: 'entity/pipe/pipe-ending-left.png',
                        x:    25,
                        y:    33
                    },
                    {
                        type: 'sprite',
                        path: 'entity/pipe/pipe-ending-right.png',
                        x:    -18,
                        y:    33
                    },
                    {
                        type: 'sprite',
                        path: 'entity/flamethrower-turret/flamethrower-turret-base-north.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'entity/flamethrower-turret/flamethrower-turret-gun-extension.png',
                        cols:   5,
                        rows:   12,
                        number: 0,
                        x:      -3,
                        y:      -37
                    },
                    {
                        type:           'animated',
                        path:           'entity/flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                        cols:           8,
                        rows:           4,
                        from:           0,
                        to:             31,
                        animationSpeed: 0.9,
                        scale:          {x: 0.5, y: 0.5},
                        alpha:          0.8,
                        x:              32,
                        y:              -54
                    }
                ]
            },
            gridSize:   {w: 2, h: 3},
            offset:     {x: -3, y: 13}
        },
        'gun-turret':          {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/gun-turret/gun-turret-gun-extension.png',
                                number: 5,
                                cols:   5,
                                rows:   4,
                                x:      15,
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
                                path: 'entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/gun-turret/gun-turret-gun-extension.png',
                                number: 10,
                                cols:   5,
                                rows:   4,
                                x:      15,
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
                                path: 'entity/gun-turret/gun-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/gun-turret/gun-turret-gun-extension.png',
                                number: 15,
                                cols:   5,
                                rows:   4,
                                x:      15,
                                y:      -30
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
                        path: 'entity/gun-turret/gun-turret-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'entity/gun-turret/gun-turret-gun-extension.png',
                        number: 0,
                        cols:   5,
                        rows:   4,
                        x:      15,
                        y:      -30
                    }
                ]
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: -17, y: 0}
        },
        'laser-turret':        {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'entity/laser-turret/laser-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/laser-turret/laser-turret-gun-start.png',
                                number: 16,
                                cols:   16,
                                rows:   4,
                                x:      15,
                                y:      -30
                            }
                        ]
                    }
                },
                4: {
                    image:      {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'entity/laser-turret/laser-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/laser-turret/laser-turret-gun-start.png',
                                number: 32,
                                cols:   16,
                                rows:   4,
                                x:      15,
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
                                path: 'entity/laser-turret/laser-turret-base.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'entity/laser-turret/laser-turret-gun-start.png',
                                number: 48,
                                cols:   16,
                                rows:   4,
                                x:      15,
                                y:      -30
                            }
                        ]
                    }
                },
            },
            image: {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/laser-turret/laser-turret-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type:   'trim',
                        path:   'entity/laser-turret/laser-turret-gun-start.png',
                        number: 0,
                        cols:   16,
                        rows:   4,
                        x:      15,
                        y:      -30
                    }
                ]
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: -17, y: 0}
        }
    };
});