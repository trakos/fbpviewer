module.exports = function () {
    function prepareInserterData(inserterName) {
        return {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 3,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.5},
                                rotation: 0.65,
                                x:        45,
                                y:        18,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.8},
                                rotation: 0.3,
                                x:        27,
                                y:        18,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        8,
                                y:        22,
                                layer:    110
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
                                path:   'base/graphics/entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 0,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.3},
                                rotation: 1,
                                x:        21,
                                y:        23,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.7},
                                rotation: 1,
                                x:        21,
                                y:        40,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0,
                                x:        15,
                                y:        8,
                                layer:    110
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
                                path:   'base/graphics/entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 1,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.5},
                                rotation: 1.35,
                                x:        -4,
                                y:        14,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.8},
                                rotation: 1.7,
                                x:        13,
                                y:        16,
                                layer:    110
                            },
                            {
                                type:     'sprite',
                                path:     'core/graphics/arrows/indication-arrow.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        33,
                                y:        22,
                                layer:    110
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
                        path:   'base/graphics/entity/' + inserterName + '/' + inserterName + '-platform.png',
                        number: 2,
                        cols:   4,
                        rows:   1,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                        scale:    {x: 1, y: 0.3},
                        rotation: 1,
                        x:        19,
                        y:        0,
                        layer:    110
                    },
                    {
                        type:     'sprite',
                        path:     'base/graphics/entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                        scale:    {x: 1, y: 1},
                        rotation: 0,
                        x:        15,
                        y:        -5,
                        layer:    110
                    },
                    {
                        type:     'sprite',
                        path:     'core/graphics/arrows/indication-arrow.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 1,
                        x:        20,
                        y:        35,
                        layer:    110
                    }
                ]
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -5, y: -7}
        };
    }

    return {
        'burner-inserter':       prepareInserterData('burner-inserter'),
        'fast-inserter':         prepareInserterData('fast-inserter'),
        'filter-inserter':       prepareInserterData('filter-inserter'),
        'inserter':              prepareInserterData('inserter'),
        'stack-inserter':        prepareInserterData('stack-inserter'),
        'stack-filter-inserter': prepareInserterData('stack-filter-inserter'),
        'long-handed-inserter':  prepareInserterData('long-handed-inserter')
    };
}
