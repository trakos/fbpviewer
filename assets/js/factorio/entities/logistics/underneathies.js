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
                                        rows:           11,
                                        from:           0,
                                        to:             beltImageColumns - 1,
                                        animationSpeed: beltAnimationSpeed,
                                        x: -5,
                                        y: -3
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 3,
                                        x:      -6,
                                        y:      -7
                                    }
                                ]
                            }
                        },
                        4: {
                            image:  {
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
                                        x: 15,
                                        y: 11
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 0,
                                        x: -5,
                                        y: -12
                                    }
                                ]
                            }
                        },
                        6: {
                            image:  {
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
                                        x: 15,
                                        y: 15
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 1,
                                        x: -3,
                                        y: -8
                                    }
                                ]
                            }
                        }
                    },
                    image:  {
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
                                x: -5,
                                y: -4
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                cols:   4,
                                rows:   2,
                                number: 2,
                                x: -5,
                                y: -10
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
                                        rows:           11,
                                        from:           0,
                                        to:             beltImageColumns - 1,
                                        animationSpeed: beltAnimationSpeed,
                                        x: -5,
                                        y: -3
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 5,
                                        x:      -3,
                                        y:      -8
                                    }
                                ]
                            }
                        },
                        4: {
                            image:  {
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
                                        x: 15,
                                        y: 5
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 6,
                                        x: -5,
                                        y: -10
                                    }
                                ]
                            }
                        },
                        6: {
                            image:  {
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
                                        x: 15,
                                        y: 15
                                    },
                                    {
                                        type:   'trim',
                                        path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                        cols:   4,
                                        rows:   2,
                                        number: 7,
                                        x: -5,
                                        y: -8
                                    }
                                ]
                            }
                        }
                    },
                    image:  {
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
                                x: -5,
                                y: 0
                            },
                            {
                                type:   'trim',
                                path:   'base/graphics/entity/' + beltPrefix + 'underground-belt/' + beltPrefix + 'underground-belt-structure.png',
                                cols:   4,
                                rows:   2,
                                number: 4,
                                x: -5,
                                y: -12
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