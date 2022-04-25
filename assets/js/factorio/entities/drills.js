module.exports = function () {
    return {
        'burner-mining-drill':   {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/burner-mining-drill/burner-mining-drill-E.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        65,
                                y:        25
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
                                path:   'base/graphics/entity/burner-mining-drill/burner-mining-drill-S.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1,
                                x:        50,
                                y:        70
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
                                path:   'base/graphics/entity/burner-mining-drill/burner-mining-drill-W.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        8,
                                y:        63
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
                        path:   'base/graphics/entity/burner-mining-drill/burner-mining-drill-N.png',
                        number: 0,
                        cols:   4,
                        rows:   8,
                        x:      0,
                        y:      0
                    },
                    {
                        type:  'sprite',
                        path:  'core/graphics/arrows/indication-arrow.png',
                        scale: {x: 0.5, y: 0.5},
                        x:     5,
                        y:     10
                    }
                ]
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: -2, y: -12}
        },
        'electric-mining-drill': {
            directions: {
                2: {
                    image:  {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-E-shadow.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-E.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-E-output.png',
                                number: 0,
                                cols:   5,
                                rows:   1,
                                x:      64,
                                y:      20
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-horizontal.png',
                                scale:  {x: 1, y: 1},
                                number: 0,
                                cols:   6,
                                rows:   5,
                                x:      20,
                                y:      -5
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-horizontal-front.png',
                                scale:  {x: 1, y: 1},
                                number: 0,
                                cols:   6,
                                rows:   5,
                                x:      15,
                                y:      15
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-E-front.png',
                                x:    36,
                                y:    23
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        85,
                                y:        45
                            }
                        ]
                    },
                    offset: {x: 0, y: 0}
                },
                4: {
                    image:  {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-S-shadow.png',
                                x:    0,
                                y:    0
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-S.png',
                                x:    0,
                                y:    -6
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill.png',
                                number: 0,
                                cols:   6,
                                rows:   5,
                                x:      10,
                                y:      -5,
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-S-output.png',
                                number: 0,
                                cols:   5,
                                rows:   1,
                                x:      24,
                                y:      69,
                            },
                            {
                                type:  'sprite',
                                path:  'base/graphics/entity/electric-mining-drill/electric-mining-drill-S-front.png',
                                scale: {x: 1, y: 1},
                                x:     0,
                                y:     48,
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1,
                                x:        48,
                                y:        85
                            }
                        ]
                    },
                    offset: {x: 0, y: 0}
                },
                6: {
                    image:  {
                        type:   'container',
                        images: [
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-W-shadow.png',
                                x:    -8,
                                y:    0
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-W.png',
                                x:    -8,
                                y:    0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-horizontal.png',
                                scale:  {x: 1, y: 1},
                                number: 0,
                                cols:   6,
                                rows:   5,
                                x:      30,
                                y:      -5
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-W-output.png',
                                number: 0,
                                cols:   5,
                                rows:   1,
                                x:      0,
                                y:      20
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-horizontal-front.png',
                                scale:  {x: 1, y: 1},
                                number: 0,
                                cols:   6,
                                rows:   5,
                                x:      25,
                                y:      15
                            },
                            {
                                type: 'sprite',
                                path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-W-front.png',
                                x:    -18,
                                y:    26
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        0,
                                y:        48
                            }
                        ]
                    },
                    offset: {x: 10, y: 0}
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-N-shadow.png',
                        x:    0,
                        y:    -16
                    },
                    {
                        type: 'sprite',
                        path: 'base/graphics/entity/electric-mining-drill/electric-mining-drill-N.png',
                        x:    0,
                        y:    -16
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill-N-output.png',
                        number: 0,
                        cols:   5,
                        rows:   1,
                        x:      30,
                        y:      -18
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/electric-mining-drill/electric-mining-drill.png',
                        number: 0,
                        cols:   6,
                        rows:   5,
                        x:      10,
                        y:      -5,
                    },
                    {
                        type:  'sprite',
                        path:  'core/graphics/arrows/indication-arrow.png',
                        scale: {x: 0.5, y: 0.5},
                        x:     32,
                        y:     -15
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: 0, y: 5}
        },
    };
}