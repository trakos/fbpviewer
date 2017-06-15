var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {
        'land-mine': {
            image:    {
                type: 'sprite',
                path: 'entity/land-mine/land-mine-set.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        }
    };
});