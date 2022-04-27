module.exports = function () {

    function prepareTransportBeltImage(beltName, imageColumns, animationSpeed, rowNumber) {
        return {
            type:           'animated',
            path:           'base/graphics/entity/' + beltName + '/' + beltName + '.png',
            cols:           imageColumns,
            rows:           20,
            from:           imageColumns * rowNumber,
            to:             imageColumns * (rowNumber + 1) - 1,
            animationSpeed: animationSpeed
        }
    }

    function prepareTransportBeltData(beltName, imageColumns, animationSpeed) {
        return {
            directions: {
                '0_2': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 5),
                    offset: {x: -16, y: -20}
                },
                '0_6': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 7),
                    offset: {x: -16, y: -20}
                },
                2: {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 0),
                    offset: {x: -16, y: -20}
                },
                '2_0': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 4),
                    offset: {x: -16, y: -20}
                },
                '2_4': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 9),
                    offset: {x: -16, y: -20}
                },
                4: {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 3),
                    offset: {x: -16, y: -16}
                },
                '4_2': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 8),
                    offset: {x: -16, y: -20}
                },
                '4_6': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 10),
                    offset: {x: -16, y: -20}
                },
                6: {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 1),
                    offset: {x: -16, y: -20}
                },
                '6_0': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 6),
                    offset: {x: -16, y: -20}
                },
                '6_4': {
                    image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 11),
                    offset: {x: -16, y: -20}
                },
            },
            image:  prepareTransportBeltImage(beltName, imageColumns, animationSpeed, 2),
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