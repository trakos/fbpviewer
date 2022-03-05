module.exports = function () {
    return {
        'accumulator':            {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/accumulator/accumulator.png'
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: -6, y: -27}
        },
        'solar-panel':            {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/solar-panel/solar-panel.png'
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
        }
    };
}