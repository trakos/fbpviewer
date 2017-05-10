var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.entities =
{
    PREFIX:   "entity/",
    ENTITIES: {
        'chemical-plant':       {
            image:    {
                type:   'trim',
                path:   'chemical-plant/chemical-plant.png',
                number: 0,
                w:      122,
                h:      134
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 0}
        },
        'assembling-machine-1': {
            image:    {
                type:   'trim',
                path:   'assembling-machine-1/assembling-machine-1.png',
                number: 0,
                w:      107,
                h:      113
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -5, y: -12}
        },
        'assembling-machine-2': {
            image:    {
                type:   'trim',
                path:   'assembling-machine-2/assembling-machine-2.png',
                number: 0,
                w:      107,
                h:      113
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -5, y: -12}
        },
        'assembling-machine-3': {
            image:    {
                type:   'trim',
                path:   'assembling-machine-3/assembling-machine-3.png',
                number: 0,
                w:      107,
                h:      113
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -5, y: -12}
        },
        'pipe':                 {
            image:    {
                type: 'sprite',
                path: "pipe/pipe-straight-horizontal-single.png"
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -25, y: -22}
        },
        'transport-belt':       {
            image:    {
                type: 'animated',
                path: 'transport-belt/transport-belt.png',
                w:    40,
                h:    40,
                from: 0,
                to:   15
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: -5, y: -5}
        },
        'lab':                  {
            image:    {
                type:   'trim',
                path:   'lab/lab.png',
                number: 0,
                w:      113,
                h:      91
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: 0, y: 5}
        },
        'centrifuge':           {
            image:    {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'centrifuge/centrifuge-A.png',
                        number: 0,
                        w:      70,
                        h:      123,
                        x:      0,
                        y:      22
                    },
                    {
                        type:   'trim',
                        path:   'centrifuge/centrifuge-B.png',
                        number: 0,
                        w:      78,
                        h:      117,
                        x:      44,
                        y:      28
                    },
                    {
                        type:   'trim',
                        path:   'centrifuge/centrifuge-C.png',
                        number: 0,
                        w:      119,
                        h:      107,
                        x:      0,
                        y:      0
                    }
                ]
            },
            gridSize: {w: 3, h: 3},
            offset:   {x: -12, y: 0}
        },
        'gate':                 {
            image:    {
                type:   'container',
                images: [
                    {
                        type: 'sprite',
                        path: 'gate/gate-base-horizontal.png',
                        x:    0,
                        y:    15
                    },
                    {
                        type:   'trim',
                        path:   'gate/gate-horizontal.png',
                        number: 0,
                        w:      32,
                        h:      36,
                        x:      0,
                        y:      -4
                    }
                ]
            },
            gridSize: {w: 1, h: 1},
            offset:   {x: 0, y: -5}
        }
    }
};