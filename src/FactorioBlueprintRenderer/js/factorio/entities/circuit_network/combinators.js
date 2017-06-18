module.exports = function () {
    return {
        'arithmetic-combinator': {
            directions:       {
                2: {
                    image:            {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 0,
                                cols:   4,
                                rows:   3,
                                x:      -5,
                                y:      -10
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        10,
                                y:        15
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        55,
                                y:        15
                            }
                        ]
                    },
                    gridSize:         {w: 2, h: 1},
                    circuitEndpoints: {
                        2: {x: 56, y: 16},
                        1: {x: 8, y: 16}
                    }
                },
                4: {
                    image:            {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 3,
                                cols:   4,
                                rows:   3,
                                x:      -20,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1,
                                x:        15,
                                y:        5
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1,
                                x:        15,
                                y:        55
                            }
                        ]
                    },
                    gridSize:         {w: 1, h: 2},
                    circuitEndpoints: {
                        1: {x: 16, y: 0},
                        2: {x: 16, y: 48}
                    }
                },
                6: {
                    image:            {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 1,
                                cols:   4,
                                rows:   3,
                                x:      -5,
                                y:      -10
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        10,
                                y:        15
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        55,
                                y:        15
                            }
                        ]
                    },
                    gridSize:         {w: 2, h: 1},
                    circuitEndpoints: {
                        2: {x: 8, y: 16},
                        1: {x: 56, y: 16}
                    }
                }
            },
            image:            {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/combinator/combinator-entities.png',
                        number: 2,
                        cols:   4,
                        rows:   3,
                        x:      -20,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/indication-arrow-gui-ascending.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 0,
                        x:        10,
                        y:        0
                    },
                    {
                        type:     'sprite',
                        path:     'core/indication-arrow-gui-ascending.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 0,
                        x:        10,
                        y:        50
                    }
                ]
            },
            circuitEndpoints: {
                1: {x: 16, y: 48},
                2: {x: 16, y: 0}
            },
            gridSize:         {w: 1, h: 2},
            offset:           {x: 0, y: 0}
        },
        'constant-combinator':   {
            directions: {
                2: {
                    image:            {
                        type:   'trim',
                        path:   'entity/combinator/combinator-entities.png',
                        number: 8,
                        cols:   4,
                        rows:   3
                    }
                },
                4: {
                    image: {
                        type:   'trim',
                        path:   'entity/combinator/combinator-entities.png',
                        number: 11,
                        cols:   4,
                        rows:   3
                    }
                },
                6: {
                    image: {
                        type:   'trim',
                        path:   'entity/combinator/combinator-entities.png',
                        number: 9,
                        cols:   4,
                        rows:   3
                    }
                }
            },
            image:      {
                type:   'trim',
                path:   'entity/combinator/combinator-entities.png',
                number: 10,
                cols:   4,
                rows:   3
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -20, y: -10}
        },
        'decider-combinator':    {
            directions:       {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 4,
                                cols:   4,
                                rows:   3,
                                x:      -5,
                                y:      -10
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        10,
                                y:        15
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        55,
                                y:        15
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1},
                    circuitEndpoints: {
                        2: {x: 56, y: 16},
                        1: {x: 8, y: 16}
                    }
                },
                4: {
                    image:            {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 7,
                                cols:   4,
                                rows:   3,
                                x:      -20,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1,
                                x:        15,
                                y:        5
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1,
                                x:        15,
                                y:        55
                            }
                        ]
                    },
                    gridSize:         {w: 1, h: 2},
                    circuitEndpoints: {
                        1: {x: 16, y: 0},
                        2: {x: 16, y: 48}
                    }
                },
                6: {
                    image:            {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/combinator/combinator-entities.png',
                                number: 5,
                                cols:   4,
                                rows:   3,
                                x:      -5,
                                y:      -10
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        10,
                                y:        15
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        55,
                                y:        15
                            }
                        ]
                    },
                    gridSize:         {w: 2, h: 1},
                    circuitEndpoints: {
                        2: {x: 8, y: 16},
                        1: {x: 56, y: 16}
                    }
                }
            },
            image:            {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/combinator/combinator-entities.png',
                        number: 6,
                        cols:   4,
                        rows:   3,
                        x:      -20,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/indication-arrow-gui-ascending.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 0,
                        x:        10,
                        y:        0
                    },
                    {
                        type:     'sprite',
                        path:     'core/indication-arrow-gui-ascending.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 0,
                        x:        10,
                        y:        50
                    }
                ]
            },
            gridSize:         {w: 1, h: 2},
            offset:           {x: 0, y: 0},
            circuitEndpoints: {
                1: {x: 16, y: 48},
                2: {x: 16, y: 0}
            },
        }
    };
}