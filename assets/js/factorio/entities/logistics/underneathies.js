module.exports = function () {

    function prepareUndergroundBeltData(beltPrefix, beltImageColumns, beltAnimationSpeed) {
        return {
            types:    {
                output: {
                    directions: {
                        2: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 3,
                                        x:      -32,
                                        y:      -36
                                    }
                                ]
                            }
                        },
                        4: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 0,
                                        x:      -32,
                                        y:      -34
                                    }
                                ]
                            }
                        },
                        6: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 1,
                                        x:      -32,
                                        y:      -36
                                    }
                                ]
                            }
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
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                cols:   4,
                                rows:   4,
                                number: 2,
                                x:      -32,
                                y:      -34
                            }
                        ]
                    }
                },
                input:  {
                    directions: {
                        2: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 5,
                                        x:      -32,
                                        y:      -36
                                    }
                                ]
                            }
                        },
                        4: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 6,
                                        x:      -32,
                                        y:      -34
                                    }
                                ]
                            }
                        },
                        6: {
                            image: {
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
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   4,
                                        number: 7,
                                        x:      -32,
                                        y:      -36
                                    }
                                ]
                            }
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
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                cols:   4,
                                rows:   4,
                                number: 4,
                                x:      -32,
                                y:      -34
                            }
                        ]
                    }
                }
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        };
    }

    return {
        'underground-belt':         prepareUndergroundBeltData('', 16, 1),
        'fast-underground-belt':    prepareUndergroundBeltData('fast-', 32, 1.5),
        'express-underground-belt': prepareUndergroundBeltData('express-', 32, 2)
    };
}