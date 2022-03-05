module.exports = function () {

    function prepareSplitterData(beltPrefix, beltImageColumns, beltAnimationSpeed) {
        return {
            directions: {
                2: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           0,
                                to:             beltImageColumns - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -5,
                                y:              -3
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           0,
                                to:             beltImageColumns - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -5,
                                y:              29
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-east.png',
                                cols:   16,
                                rows:   2,
                                number: 0,
                                x:      -5,
                                y:      -12
                            }
                        ]
                    },
                    gridSize: {w: 1, h: 2}
                },
                4: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           beltImageColumns,
                                to:             beltImageColumns * 2 - 1,
                                rotation:       1,
                                animationSpeed: beltAnimationSpeed,
                                x:              15,
                                y:              11
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           beltImageColumns,
                                to:             beltImageColumns * 2 - 1,
                                rotation:       1,
                                animationSpeed: beltAnimationSpeed,
                                x:              48,
                                y:              11
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-south.png',
                                cols:   16,
                                rows:   2,
                                number: 0,
                                x:      -5,
                                y:      -5
                            }
                        ]
                    },
                    gridSize: {w: 2, h: 1}
                },
                6: {
                    image:    {
                        type:   'container',
                        images: [
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           0,
                                to:             beltImageColumns - 1,
                                rotation:       1,
                                animationSpeed: beltAnimationSpeed,
                                x:              15,
                                y:              15
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           11,
                                from:           0,
                                to:             beltImageColumns - 1,
                                rotation:       1,
                                animationSpeed: beltAnimationSpeed,
                                x:              15,
                                y:              48
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-west.png',
                                cols:   16,
                                rows:   2,
                                number: 0,
                                x:      -2,
                                y:      -8
                            }
                        ]
                    },
                    gridSize: {w: 1, h: 2}
                }
            },
            image:      {
                type:   'container',
                images: [
                    {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                        cols:           beltImageColumns,
                        rows:           11,
                        from:           beltImageColumns,
                        to:             beltImageColumns * 2 - 1,
                        animationSpeed: beltAnimationSpeed,
                        x: -4,
                        y: -1
                    },
                    {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                        cols:           beltImageColumns,
                        rows:           11,
                        from:           beltImageColumns,
                        to:             beltImageColumns * 2 - 1,
                        animationSpeed: beltAnimationSpeed,
                        x: 28,
                        y: -1
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-north.png',
                        cols:   16,
                        rows:   2,
                        number: 0,
                        x:      0,
                        y:      0
                    }
                ]
            },
            gridSize:   {w: 2, h: 1},
            offset:     {x: 0, y: 0}
        };
    }

    return {
        'splitter':         prepareSplitterData('', 16, 1),
        'fast-splitter':    prepareSplitterData('fast-', 32, 1.5),
        'express-splitter': prepareSplitterData('express-', 32, 2)
    };
}