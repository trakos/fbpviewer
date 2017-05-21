var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {
        'express-transport-belt': {
            image:    {
                type:           'animated',
                path:           'entity/express-transport-belt/express-transport-belt.png',
                cols:           32,
                rows:           11,
                from:           0,
                to:             31,
                animationSpeed: 2
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -5, y: -5}
        },
        'transport-belt':         {
            image:    {
                type: 'animated',
                path: 'entity/transport-belt/transport-belt.png',
                cols: 16,
                rows: 11,
                from: 0,
                to:   15
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -5, y: -5}
        }

    };
});