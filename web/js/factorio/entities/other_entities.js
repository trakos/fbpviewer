var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {
        'beacon':                 {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'entity/beacon/beacon-base.png',
                        x:    0,
                        y:    0
                    },
                    {
                        type: 'animated',
                        path: 'entity/beacon/beacon-antenna.png',
                        cols: 8,
                        rows: 4,
                        from: 0,
                        to:   31,
                        x:    19,
                        y:    -34
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
        },
        'lab':                    {
            image:    {
                type:   'trim',
                path:   'entity/lab/lab.png',
                number: 0,
                cols:   11,
                rows:   3
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 5}
        },
    };
});