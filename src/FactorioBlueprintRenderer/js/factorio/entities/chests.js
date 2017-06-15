const { createEntitiesFunctions } = require("./index");

createEntitiesFunctions.push(function () {
    return {
        'wooden-chest': {
            image:    {
                type:           'sprite',
                path:           'entity/wooden-chest/wooden-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'iron-chest': {
            image:    {
                type:           'sprite',
                path:           'entity/iron-chest/iron-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'steel-chest': {
            image:    {
                type:           'sprite',
                path:           'entity/steel-chest/steel-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-active-provider': {
            image:    {
                type:           'sprite',
                path:           'entity/logistic-chest/logistic-chest-active-provider.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-passive-provider': {
            image:    {
                type:           'sprite',
                path:           'entity/logistic-chest/logistic-chest-passive-provider.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-requester': {
            image:    {
                type:           'sprite',
                path:           'entity/logistic-chest/logistic-chest-requester.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-storage': {
            image:    {
                type:           'sprite',
                path:           'entity/logistic-chest/logistic-chest-storage.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
    };
});