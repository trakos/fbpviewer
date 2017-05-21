var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {
        'gate':                   {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/gate/gate-base-horizontal.png',
                        x:    0,
                        y:    15
                    },
                    {
                        type:   'trim',
                        path:   'entity/gate/gate-horizontal.png',
                        number: 0,
                        cols:   8,
                        rows:   2,
                        x:      0,
                        y:      -4
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: -5}
        },
        'stone-wall':             {
            image:    {
                type: 'sprite',
                path: 'entity/stone-wall/wall-single.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 5, y: -15}
        },


    };
});