module.exports = function () {

    function prepareTransportBeltData(beltName, imageColumns, animationSpeed) {
        return {
            directions: {
                2: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           20,
                        from:           0,
                        to:             imageColumns - 1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: -16, y: -20}
                },
                4: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           20,
                        from:           imageColumns * 3,
                        to:             imageColumns * 4 - 1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: -16, y: -16}
                },
                6: {
                    image:  {
                        type:           'animated',
                        path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                        cols:           imageColumns,
                        rows:           20,
                        from:           imageColumns,
                        to:             imageColumns * 2 - 1,
                        animationSpeed: animationSpeed
                    },
                    offset: {x: -16, y: -20}
                }
            },
            image:      {
                type:           'animated',
                path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
                cols:           imageColumns,
                rows:           20,
                from:           imageColumns * 2,
                to:             imageColumns * 3 - 1,
                animationSpeed: animationSpeed
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -16, y: -16}
        };
    }


    return {
        'transport-belt':         prepareTransportBeltData('transport-belt', 16, 1),
        'fast-transport-belt':    prepareTransportBeltData('fast-transport-belt', 32, 1.5),
        'express-transport-belt': prepareTransportBeltData('express-transport-belt', 32, 2)
    };
}