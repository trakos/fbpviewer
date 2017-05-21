var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {
        'pipe':                   {
            image:    {
                type: 'sprite',
                path: "entity/pipe/pipe-straight-horizontal-single.png"
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -25, y: -22}
        },
        'storage-tank':           {
            directions: {
                2: {
                    image: {
                        type:   'trim',
                        path:   'entity/storage-tank/storage-tank.png',
                        number: 1,
                        cols:   2,
                        rows:   1
                    }
                },
                6: {
                    image: {
                        type:   'trim',
                        path:   'entity/storage-tank/storage-tank.png',
                        number: 1,
                        cols:   2,
                        rows:   1
                    }
                }
            },
            image:      {
                type:   'trim',
                path:   'entity/storage-tank/storage-tank.png',
                number: 0,
                cols:   2,
                rows:   1
            },
            gridSize:   {w: 2, h: 2},
            offset:     {x: 0, y: -6}

        }
    };
});