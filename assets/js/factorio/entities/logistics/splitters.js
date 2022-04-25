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
                                rows:           20,
                                from:           0,
                                to:             beltImageColumns - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -16,
                                y:              -20
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           20,
                                from:           0,
                                to:             beltImageColumns - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -16,
                                y:              12
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-east-top_patch.png',
                                cols:   8,
                                rows:   4,
                                number: 0,
                                x:      -5,
                                y:      -12
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-east.png',
                                cols:   8,
                                rows:   4,
                                number: 0,
                                x:      -5,
                                y:      20
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
                                rows:           20,
                                from:           beltImageColumns * 3,
                                to:             beltImageColumns * 4 - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -16,
                                y:              -16
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           20,
                                from:           beltImageColumns * 3,
                                to:             beltImageColumns * 4 - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              15,
                                y:              -16
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-south.png',
                                cols:   8,
                                rows:   4,
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
                                rows:           20,
                                from:           beltImageColumns,
                                to:             beltImageColumns * 2 - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -16,
                                y:              -20
                            },
                            {
                                type:           'animated',
                                path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                                cols:           beltImageColumns,
                                rows:           20,
                                from:           beltImageColumns,
                                to:             beltImageColumns * 2 - 1,
                                animationSpeed: beltAnimationSpeed,
                                x:              -16,
                                y:              12
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-west-top_patch.png',
                                cols:   8,
                                rows:   4,
                                number: 0,
                                x:      -2,
                                y:      -8
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-west.png',
                                cols:   8,
                                rows:   4,
                                number: 0,
                                x:      -2,
                                y:      24
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
                        rows:           20,
                        from:           beltImageColumns * 2,
                        to:             beltImageColumns * 3 - 1,
                        animationSpeed: beltAnimationSpeed,
                        x:              -16,
                        y:              -16
                    },
                    {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltPrefix + 'transport-belt/' + beltPrefix + 'transport-belt.png',
                        cols:           beltImageColumns,
                        rows:           20,
                        from:           beltImageColumns * 2,
                        to:             beltImageColumns * 3 - 1,
                        animationSpeed: beltAnimationSpeed,
                        x:              15,
                        y:              -16
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/entity/' + beltPrefix + 'splitter/' + beltPrefix + 'splitter-north.png',
                        cols:   8,
                        rows:   4,
                        number: 0,
                        x:      -5,
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