module.exports = function () {
    return {
        'wooden-chest':                    {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/wooden-chest/wooden-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'iron-chest':                      {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/iron-chest/iron-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'steel-chest':                     {
            image:    {
                type: 'sprite',
                path: 'base/graphics/entity/steel-chest/steel-chest.png'
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-active-provider':  {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/logistic-chest/logistic-chest-active-provider.png',
                number: 0,
                cols:   7,
                rows:   1,
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-buffer':        {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/logistic-chest/logistic-chest-buffer.png',
                number: 0,
                cols:   7,
                rows:   1,
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-passive-provider': {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/logistic-chest/logistic-chest-passive-provider.png',
                number: 0,
                cols:   7,
                rows:   1,
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-requester':        {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/logistic-chest/logistic-chest-requester.png',
                number: 0,
                cols:   7,
                rows:   1,
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
        'logistic-chest-storage':          {
            image:    {
                type:   'trim',
                path:   'base/graphics/entity/logistic-chest/logistic-chest-storage.png',
                number: 0,
                cols:   7,
                rows:   1,
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: 0}
        },
    };
}