module.exports = function () {
    return {
        'electric-furnace':       {
            image:    {
                type: 'sprite',
                path: 'entity/electric-furnace/electric-furnace-base.png'
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
        },
        'steel-furnace':          {
            image:    {
                type: 'sprite',
                path: 'entity/steel-furnace/steel-furnace.png'
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: -12, y: -10}
        },
        'stone-furnace':          {
            image:    {
                type: 'sprite',
                path: 'entity/stone-furnace/stone-furnace.png'
            },
            gridSize: {w: 2, h: 2},
            offset:   {x: 7, y: 0}
        }
    };
}