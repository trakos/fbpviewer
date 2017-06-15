module.exports = function () {
    return {
        'radar':                  {
            image:    {
                type: 'animated',
                path: 'entity/radar/radar.png',
                from: 0,
                to:   63,
                cols: 8,
                rows: 8
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: -32}
        },
    };
}