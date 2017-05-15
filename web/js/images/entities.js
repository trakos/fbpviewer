var FactorioBlueprintReader = FactorioBlueprintReader || {};


var BX = 0,
    BY = 0,
    BSX = 1,
    BSY = 1,
    BR = 0,
    NX = 0,
    NY = 0,
    GX = 0,
    GY = 0,
    GSX = 1,
    GSY = 1,
    GR = 0,
    SX = 0,
    SY = 0;

function prepareInserterData(inserterName) {
    return {
        directions: {
            2: {
                image: {
                    type:   'container',
                    images: [
                        {
                            type:   'trim',
                            path:   inserterName + '/' + inserterName + '-platform.png',
                            number: 1,
                            cols:   4,
                            rows:   1,
                            x:      0,
                            y:      0
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-open.png',
                            scale:    {x: 1, y: 0.5},
                            rotation: 1.35,
                            x:        -4,
                            y:        14
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-base.png',
                            scale:    {x: 1, y: 0.8},
                            rotation: 1.7,
                            x:        13,
                            y:        16
                        }
                    ]
                }
            },
            4: {},
            6: {
                image: {
                    type:   'container',
                    images: [
                        {
                            type:   'trim',
                            path:   inserterName + '/' + inserterName + '-platform.png',
                            number: 1,
                            cols:   4,
                            rows:   1,
                            x:      0,
                            y:      0
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-open.png',
                            scale:    {x: 1, y: 0.5},
                            rotation: 0.65,
                            x:        45,
                            y:        18
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-base.png',
                            scale:    {x: 1, y: 0.8},
                            rotation: 0.3,
                            x:        27,
                            y:        18
                        }
                    ]
                }
            },
            8: {
                image: {
                    type:   'container',
                    images: [
                        {
                            type:   'trim',
                            path:   inserterName + '/' + inserterName + '-platform.png',
                            number: 0,
                            cols:   4,
                            rows:   1,
                            x:      0,
                            y:      0
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-base.png',
                            scale:    {x: 1, y: 0.3},
                            rotation: 1,
                            x:        21,
                            y:        23
                        },
                        {
                            type:     'sprite',
                            path:     inserterName + '/' + inserterName + '-hand-open.png',
                            scale:    {x: 1, y: 0.7},
                            rotation: 1,
                            x:        21,
                            y:        40
                        }
                    ]
                }
            }
        },
        image:      {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   inserterName + '/' + inserterName + '-platform.png',
                    number: 2,
                    cols:   4,
                    rows:   1,
                    x:      0,
                    y:      0
                },
                {
                    type:     'sprite',
                    path:     inserterName + '/' + inserterName + '-hand-base.png',
                    scale:    {x: 1, y: 0.3},
                    rotation: 1,
                    x:        21,
                    y:        23
                },
                {
                    type:     'sprite',
                    path:     inserterName + '/' + inserterName + '-hand-open.png',
                    scale:    {x: 1, y: 0.7},
                    rotation: 1,
                    x:        21,
                    y:        40
                }
            ]
        },
        gridSize:   {w: 1, h: 1},
        offset:     {x: -5, y: -7}
    };
}

function redoEntities() {
    FactorioBlueprintReader.entities =
    {
        PREFIX:   "entity/",
        ENTITIES: {
            'accumulator':            {
                image:    {
                    type: 'sprite',
                    path: 'accumulator/accumulator.png'
                },
                gridSize: {w: 2, h: 2},
                offset:   {x: -6, y: 5}
            },
            'arithmetic-combinator':  {
                image:    {
                    type:   'trim',
                    path:   'combinator/combinator-entities.png',
                    number: 0,
                    cols:   4,
                    rows:   3
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: 0, y: 0}
            },
            'assembling-machine-1':   {
                image:    {
                    type:   'trim',
                    path:   'assembling-machine-1/assembling-machine-1.png',
                    number: 0,
                    cols:   8,
                    rows:   4
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: -5, y: -12}
            },
            'assembling-machine-2':   {
                image:    {
                    type:   'trim',
                    path:   'assembling-machine-2/assembling-machine-2.png',
                    number: 0,
                    cols:   8,
                    rows:   4
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: -5, y: -12}
            },
            'assembling-machine-3':   {
                image:    {
                    type:   'trim',
                    path:   'assembling-machine-3/assembling-machine-3.png',
                    number: 0,
                    cols:   8,
                    rows:   4
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: -5, y: -12}
            },
            'beacon':                 {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type: 'sprite',
                            path: 'beacon/beacon-base.png',
                            x:    0,
                            y:    0
                        },
                        {
                            type: 'animated',
                            path: 'beacon/beacon-antenna.png',
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
            'big-electric-pole':      {
                image:    {
                    type:   'trim',
                    path:   'big-electric-pole/big-electric-pole.png',
                    number: 0,
                    rows:   1,
                    cols:   4
                },
                gridSize: {w: 2, h: 2},
                offset:   {x: 0, y: 0}
            },
            'boiler':                 {
                image:    {
                    type: 'sprite',
                    path: 'boiler/boiler-S-idle.png'
                },
                gridSize: {w: 2, h: 1},
                offset:   {x: 0, y: 0}
            },
            'burner-inserter':        prepareInserterData('burner-inserter'),
            'burner-mining-drill':    {
                image:    {
                    type:   'trim',
                    path:   'burner-mining-drill/east.png',
                    number: 0,
                    cols:   4,
                    rows:   8
                },
                gridSize: {w: 2, h: 2},
                offset:   {x: 0, y: 0}
            },
            'centrifuge':             {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type:   'trim',
                            path:   'centrifuge/centrifuge-A.png',
                            number: 0,
                            cols:   8,
                            rows:   8,
                            x:      0,
                            y:      22
                        },
                        {
                            type:   'trim',
                            path:   'centrifuge/centrifuge-B.png',
                            number: 0,
                            cols:   8,
                            rows:   8,
                            x:      44,
                            y:      28
                        },
                        {
                            type:   'trim',
                            path:   'centrifuge/centrifuge-C.png',
                            number: 0,
                            cols:   8,
                            rows:   8,
                            x:      0,
                            y:      0
                        }
                    ]
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: -12, y: 0}
            },
            'chemical-plant':         {
                image:    {
                    type:   'trim',
                    path:   'chemical-plant/chemical-plant.png',
                    number: 0,
                    cols:   4,
                    rows:   1
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 0}
            },
            'constant-combinator':    {
                image:    {
                    type:   'trim',
                    path:   'combinator/combinator-entities.png',
                    number: 8,
                    cols:   4,
                    rows:   3
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: 0, y: 0}
            },
            'decider-combinator':     {
                image:    {
                    type:   'trim',
                    path:   'combinator/combinator-entities.png',
                    number: 4,
                    cols:   4,
                    rows:   3
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: 0, y: 0}
            },
            'electric-furnace':       {
                image:    {
                    type: 'sprite',
                    path: 'electric-furnace/electric-furnace-base.png'
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 0}
            },
            'electric-mining-drill':  {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type:    'animated',
                            path:    'electric-mining-drill/electric-mining-drill-E-drill-shadow.png',
                            from:    0,
                            to:      63,
                            reverse: true,
                            cols:    8,
                            rows:    8,
                            x:       0,
                            y:       0
                        },
                        {
                            type:    'animated',
                            path:    'electric-mining-drill/electric-mining-drill-E.png',
                            from:    0,
                            to:      63,
                            reverse: true,
                            cols:    8,
                            rows:    8,
                            x:       0,
                            y:       0
                        }
                    ]
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 0}
            },
            'express-transport-belt': {
                image:    {
                    type:           'animated',
                    path:           'express-transport-belt/express-transport-belt.png',
                    cols:           32,
                    rows:           11,
                    from:           0,
                    to:             31,
                    animationSpeed: 2
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: -5, y: -5}
            },
            'fast-inserter':          prepareInserterData('fast-inserter'),
            'filter-inserter':        prepareInserterData('filter-inserter'),
            'flamethrower-turret':    {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type: 'sprite',
                            path: 'pipe/pipe-ending-down.png',
                            x:    -11,
                            y:    -31
                        },
                        {
                            type: 'sprite',
                            path: 'pipe/pipe-ending-up.png',
                            x:    -12,
                            y:    21
                        },
                        {
                            type: 'sprite',
                            path: 'flamethrower-turret/flamethrower-turret-base-east.png',
                            x:    0,
                            y:    0
                        },
                        {
                            type:   'trim',
                            path:   'flamethrower-turret/flamethrower-turret-gun-extension.png',
                            cols:   5,
                            rows:   12,
                            number: 45,
                            x:      33,
                            y:      -20
                        },
                        {
                            type:           'animated',
                            path:           'flamethrower-turret/flamethrower-turret-muzzle-fire.png',
                            cols:           8,
                            rows:           4,
                            from:           0,
                            to:             31,
                            animationSpeed: 0.9,
                            x:              98,
                            y:              -21
                        }
                    ]
                },
                gridSize: {w: 3, h: 2},
                offset:   {x: -6, y: 5}
            },
            'gate':                   {
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
            'inserter':               prepareInserterData('inserter'),
            'lab':                    {
                image:    {
                    type:   'trim',
                    path:   'lab/lab.png',
                    number: 0,
                    cols:   11,
                    rows:   3
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 5}
            },
            'laser-turret':           {
                directions: {
                    2: {
                        image: {
                            type:   'container',
                            images: [
                                {
                                    type: 'sprite',
                                    path: 'laser-turret/laser-turret-base.png',
                                    x:    0,
                                    y:    0
                                },
                                {
                                    type:   'trim',
                                    path:   'laser-turret/laser-turret-gun-start.png',
                                    number: 16,
                                    cols:   16,
                                    rows:   4,
                                    x:      15,
                                    y:      -30
                                }
                            ]
                        }
                    },
                    4: {},
                    6: {
                        image: {
                            type:   'container',
                            images: [
                                {
                                    type: 'sprite',
                                    path: 'laser-turret/laser-turret-base.png',
                                    x:    0,
                                    y:    0
                                },
                                {
                                    type:   'trim',
                                    path:   'laser-turret/laser-turret-gun-start.png',
                                    number: 48,
                                    cols:   16,
                                    rows:   4,
                                    x:      15,
                                    y:      -30
                                }
                            ]
                        }
                    },
                    8: {
                        image: {
                            type:   'container',
                            images: [
                                {
                                    type: 'sprite',
                                    path: 'laser-turret/laser-turret-base.png',
                                    x:    0,
                                    y:    0
                                },
                                {
                                    type:   'trim',
                                    path:   'laser-turret/laser-turret-gun-start.png',
                                    number: 0,
                                    cols:   16,
                                    rows:   4,
                                    x:      15,
                                    y:      -30
                                }
                            ]
                        }
                    }
                },
                image:      {
                    type:   'container',
                    images: [
                        {
                            type: 'sprite',
                            path: 'laser-turret/laser-turret-base.png',
                            x:    0,
                            y:    0
                        },
                        {
                            type:   'trim',
                            path:   'laser-turret/laser-turret-gun-start.png',
                            number: 32,
                            cols:   16,
                            rows:   4,
                            x:      15,
                            y:      -30
                        }
                    ]
                },
                gridSize:   {w: 2, h: 2},
                offset:     {x: 15, y: 0}
            },
            'medium-electric-pole':   {
                image:    {
                    type:   'trim',
                    path:   'medium-electric-pole/medium-electric-pole.png',
                    number: 0,
                    cols:   4,
                    rows:   1
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: -10, y: -10}
            },
            'oil-refinery':           {
                image:    {
                    type:   'trim',
                    path:   'oil-refinery/oil-refinery.png',
                    number: 0,
                    cols:   4,
                    rows:   1
                },
                gridSize: {w: 5, h: 5},
                offset:   {x: 0, y: 0}
            },
            'pipe':                   {
                image:    {
                    type: 'sprite',
                    path: "pipe/pipe-straight-horizontal-single.png"
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: -25, y: -22}
            },
            'power-switch':           {
                image:    {
                    type:   'trim',
                    path:   'power-switch/power-switch.png',
                    number: 0,
                    cols:   2,
                    rows:   3
                },
                gridSize: {w: 2, h: 1},
                offset:   {x: 0, y: 0}
            },
            'programmable-speaker':   {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type: 'sprite',
                            path: 'programmable-speaker/programmable-speaker-shadow.png',
                            x:    10,
                            y:    70
                        },
                        {
                            type: 'sprite',
                            path: 'programmable-speaker/programmable-speaker.png',
                            x:    0,
                            y:    0
                        }
                    ]
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: 0, y: 0}
            },
            'radar':                  {
                image:    {
                    type: 'animated',
                    path: 'radar/radar.png',
                    from: 0,
                    to:   63,
                    cols: 8,
                    rows: 8
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 0}
            },
            'rocket-silo':            {
                image:    {
                    type:   'container',
                    images: [
                        {
                            type: 'sprite',
                            path: 'rocket-silo/04-05-doors/04-door-back.png',
                            x:    70,
                            y:    190
                        },
                        {
                            type: 'sprite',
                            path: 'rocket-silo/04-05-doors/05-door-front.png',
                            x:    70,
                            y:    190
                        },
                        {
                            type: 'sprite',
                            path: 'rocket-silo/06-silo-base/06-silo-base-day.png',
                            x:    0,
                            y:    0
                        }
                    ]
                },
                gridSize: {w: 9, h: 10},
                offset:   {x: 0, y: 0}
            },
            'solar-panel':            {
                image:    {
                    type: 'sprite',
                    path: 'solar-panel/solar-panel.png'
                },
                gridSize: {w: 3, h: 3},
                offset:   {x: 0, y: 0}
            },
            'stack-inserter':         prepareInserterData('stack-inserter'),
            'stack-filter-inserter':  prepareInserterData('stack-filter-inserter'),
            'steam-turbine':          {
                directions: {
                    2: {
                        image:    {
                            type:   'trim',
                            path:   'steam-turbine/steam-turbine-H.png',
                            cols:   4,
                            rows:   2,
                            number: 0
                        },
                        gridSize: {w: 5, h: 3},
                        offset:   {x: 0, y: -10}
                    },
                    6: {
                        image:    {
                            type:   'trim',
                            path:   'steam-turbine/steam-turbine-H.png',
                            cols:   4,
                            rows:   2,
                            number: 0
                        },
                        gridSize: {w: 5, h: 3},
                        offset:   {x: 0, y: -10}
                    }
                },
                image:      {
                    type:   'trim',
                    path:   'steam-turbine/steam-turbine-V.png',
                    cols:   4,
                    rows:   2,
                    number: 0
                },
                gridSize:   {w: 3, h: 5},
                offset:     {x: 0, y: 0}

            },
            'steel-furnace':          {
                image:    {
                    type: 'sprite',
                    path: 'steel-furnace/steel-furnace.png'
                },
                gridSize: {w: 2, h: 2},
                offset:   {x: -12, y: -10}
            },
            'stone-furnace':          {
                image:    {
                    type: 'sprite',
                    path: 'stone-furnace/stone-furnace.png'
                },
                gridSize: {w: 2, h: 2},
                offset:   {x: 7, y: 0}
            },
            'stone-wall':             {
                image:    {
                    type: 'sprite',
                    path: 'stone-wall/wall-single.png'
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: 5, y: -15}
            },
            'storage-tank':           {
                directions: {
                    2: {
                        image: {
                            type:   'trim',
                            path:   'storage-tank/storage-tank.png',
                            number: 1,
                            cols:   2,
                            rows:   1
                        }
                    },
                    6: {
                        image: {
                            type:   'trim',
                            path:   'storage-tank/storage-tank.png',
                            number: 1,
                            cols:   2,
                            rows:   1
                        }
                    }
                },
                image:      {
                    type:   'trim',
                    path:   'storage-tank/storage-tank.png',
                    number: 0,
                    cols:   2,
                    rows:   1
                },
                gridSize:   {w: 2, h: 2},
                offset:     {x: 0, y: -6}

            },
            'transport-belt':         {
                image:    {
                    type: 'animated',
                    path: 'transport-belt/transport-belt.png',
                    cols: 16,
                    rows: 11,
                    from: 0,
                    to:   15
                },
                gridSize: {w: 1, h: 1},
                offset:   {x: -5, y: -5}
            }
        }
    };

}

redoEntities();