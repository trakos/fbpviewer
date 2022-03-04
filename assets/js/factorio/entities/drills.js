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
                                path:   'entity/burner-mining-drill/east.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
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
                                path:   'entity/burner-mining-drill/south.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
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
                                path:   'entity/burner-mining-drill/west.png',
                                number: 0,
                                cols:   4,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
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
                        path:   'entity/burner-mining-drill/north.png',
                        number: 0,
                        cols:   4,
                        rows:   8,
                        x:      0,
                        y:      0
                    },
                    {
                        type:  'sprite',
                        path:  'core/indication-arrow-gui-ascending.png',
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
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-E-drill-shadow.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-E.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      0,
                                y:      0
                            }
                        ]
                    },
                    offset:   {x: 0, y: 0}
                },
                4: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-S-drill-shadow.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      0,
                                y:      0
                            },
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-S.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      0,
                                y:      -6
                            }
                        ]
                    },
                    offset:   {x: 0, y: 0}
                },
                6: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-W-drill-shadow.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      -8,
                                y:      0
                            },
                            {
                                type:   'trim',
                                path:   'entity/electric-mining-drill/electric-mining-drill-W.png',
                                number: 0,
                                cols:   8,
                                rows:   8,
                                x:      -8,
                                y:      0
                            }
                        ]
                    },
                    offset:   {x: 0, y: 0}
                }
            },
            image:    {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'entity/electric-mining-drill/electric-mining-drill-N-drill-shadow.png',
                        number: 0,
                        cols:   8,
                        rows:   8,
                        x:      0,
                        y:      -16
                    },
                    {
                        type:   'trim',
                        path:   'entity/electric-mining-drill/electric-mining-drill-N.png',
                        number: 0,
                        cols:   8,
                        rows:   8,
                        x:      0,
                        y:      -16
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
        },
    };
}