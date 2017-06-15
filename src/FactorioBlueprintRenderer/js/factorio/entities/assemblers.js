const { createEntitiesFunctions } = require("./index");

createEntitiesFunctions.push(function () {
    return {
        'assembling-machine-1':   {
            image:    {
                type:   'trim',
                path:   'entity/assembling-machine-1/assembling-machine-1.png',
                number: 0,
                cols:   8,
                rows:   4
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -5, y: -12}
        },
        'assembling-machine-2':   {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/assembling-machine-2/assembling-machine-2.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        95,
                                y:        55
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        10,
                                y:        55
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
                                path:   'entity/assembling-machine-2/assembling-machine-2.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:  'sprite',
                                path:  'core/fluid-indication-arrow.png',
                                scale: {x: 0.5, y: 0.5},
                                x:     40,
                                y:     -3
                            },
                            {
                                type:  'sprite',
                                path:  'core/fluid-indication-arrow.png',
                                scale: {x: 0.5, y: 0.5},
                                x:     40,
                                y:     80
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
                                path:   'entity/assembling-machine-2/assembling-machine-2.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        95,
                                y:        55
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        15,
                                y:        55
                            }
                        ]
                    }
                },
                8: {}
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/assembling-machine-2/assembling-machine-2.png',
                        number: 0,
                        cols:   8,
                        rows:   4,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        52,
                        y:        15
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        52,
                        y:        100
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: -5, y: -8}
        },
        'assembling-machine-3':   {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/assembling-machine-3/assembling-machine-3.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        95,
                                y:        55
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        10,
                                y:        55
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
                                path:   'entity/assembling-machine-3/assembling-machine-3.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:  'sprite',
                                path:  'core/fluid-indication-arrow.png',
                                scale: {x: 0.5, y: 0.5},
                                x:     40,
                                y:     -3
                            },
                            {
                                type:  'sprite',
                                path:  'core/fluid-indication-arrow.png',
                                scale: {x: 0.5, y: 0.5},
                                x:     40,
                                y:     80
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
                                path:   'entity/assembling-machine-3/assembling-machine-3.png',
                                number: 0,
                                cols:   8,
                                rows:   4,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        95,
                                y:        55
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        15,
                                y:        55
                            }
                        ]
                    }
                },
                8: {}
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/assembling-machine-3/assembling-machine-3.png',
                        number: 0,
                        cols:   8,
                        rows:   4,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        52,
                        y:        15
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        52,
                        y:        100
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: -5, y: -8}
        }
    };
});