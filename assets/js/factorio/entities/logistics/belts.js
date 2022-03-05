module.exports = function () {

    function prepareTransportBeltData(beltName, imageColumns, animationSpeed) {
        return {
            directions: {
                2: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           11,
                        from:           0,
                        to:             imageColumns - 1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: -5, y: -3}
                },
                4: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           11,
                        from:           imageColumns,
                        to:             imageColumns * 2 - 1,
                        rotation:       1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: 15, y: 12}
                },
                6: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           11,
                        from:           0,
                        to:             imageColumns - 1,
                        rotation:       1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: 15, y: 15}
                }
            },
            image:      {
                type:           'animated',
                path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                cols:           imageColumns,
                rows:           11,
                from:           imageColumns,
                to:             imageColumns * 2 - 1,
                animationSpeed: animationSpeed
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -5, y: 0}
        };
    }


    return {
        'transport-belt':         prepareTransportBeltData('transport-belt', 16, 1),
        'fast-transport-belt':    prepareTransportBeltData('fast-transport-belt', 32, 1.5),
        'express-transport-belt': prepareTransportBeltData('express-transport-belt', 32, 2)
    };
}