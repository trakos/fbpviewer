module.exports = function () {
    return {
        'pipe':           {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/pipe/pipe-straight-horizontal.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -16, y: -16}
        },
        'pipe-to-ground': {
            directions: {
                2: {
                    image: {
                        type: 'sprite',
                        path: 'base/graphics/entity/pipe-to-ground/pipe-to-ground-right.png'
                    }
                },
                4: {
                    image: {
                        type: 'sprite',
                        path: 'base/graphics/entity/pipe-to-ground/pipe-to-ground-down.png'
                    }
                },
                6: {
                    image: {
                        type: 'sprite',
                        path: 'base/graphics/entity/pipe-to-ground/pipe-to-ground-left.png'
                    }
                }
            },
            image:      {
                type: 'sprite',
                path: 'base/graphics/entity/pipe-to-ground/pipe-to-ground-up.png'
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -16, y: -16}
        },
        'offshore-pump':  {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/offshore-pump/offshore-pump_East.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        12,
                                y:        24,
                                layer:    200,
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1},
                    offset:   {x: 30, y: -10}
                },
                4: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/offshore-pump/offshore-pump_South.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        14,
                                y:        24,
                            }
                        ]
                    },
                    gridSize: {w: 1, h: 2},
                    offset:   {x: -10, y: 0}
                },
                6: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/offshore-pump/offshore-pump_West.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        56,
                                y:        24
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1},
                    offset:   {x: 0, y: -10}
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/offshore-pump/offshore-pump_North.png',
                        number: 0,
                        cols:   8,
                        rows:   4,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/graphics/arrows/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        26,
                        y:        70
                    }
                ]
            },
            gridSize:   {w: 1, h: 2},
            offset:     {x: -10, y: -10}

        },
        'pump':           {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/pump/pump-east.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        64,
                                y:        24
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1},
                    offset:   {x: -2, y: -8}
                },
                4: {
                    image:  {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/pump/pump-south.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1,
                                x:        16,
                                y:        64
                            }
                        ]
                    },
                    offset: {x: -2, y: -8}
                },
                6: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/pump/pump-west.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        0,
                                y:        24
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1},
                    offset:   {x: -2, y: -8}
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/pump/pump-north.png',
                        number: 0,
                        cols:   8,
                        rows:   4,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/graphics/arrows/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 0,
                        x:        8,
                        y:        -8
                    }
                ]
            },
            gridSize:   {w: 1, h: 2},
            offset:     {x: -2, y: 0}
        },
        'storage-tank':   {
            directions: {
                2: {
                    image: {
                        type:   'trim',
                        path:   'base/graphics/entity/storage-tank/storage-tank.png',
                        number: 1,
                        cols:   2,
                        rows:   1
                    }
                },
                6: {
                    image: {
                        type:   'trim',
                        path:   'base/graphics/entity/storage-tank/storage-tank.png',
                        number: 1,
                        cols:   2,
                        rows:   1
                    }
                }
            },
            image:      {
                type:   'trim',
                path:   'base/graphics/entity/storage-tank/storage-tank.png',
                number: 0,
                cols:   2,
                rows:   1
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: -7, y: -2}
        }
    };
}