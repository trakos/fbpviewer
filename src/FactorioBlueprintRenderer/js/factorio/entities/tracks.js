module.exports = function () {

    const LAYER_BG = 10;
    const LAYER_PATH = 20;
    const LAYER_TIES = 30;
    const LAYER_BACKPLATES = 40;

    function createTrackImage(directionName) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'entity/straight-rail/straight-rail-' + directionName + '-stone-path-background.png',
                    x:      0,
                    y:      0,
                    cols:   3,
                    rows:   1,
                    number: 0,
                    layer:  LAYER_BG
                },
                {
                    type:   'trim',
                    path:   'entity/straight-rail/straight-rail-' + directionName + '-stone-path.png',
                    x:      0,
                    y:      0,
                    cols:   3,
                    rows:   1,
                    number: 0,
                    layer:  LAYER_PATH
                },
                {
                    type:   'trim',
                    path:   'entity/straight-rail/straight-rail-' + directionName + '-ties.png',
                    x:      0,
                    y:      0,
                    cols:   3,
                    rows:   1,
                    number: 0,
                    layer:  LAYER_TIES
                },
                {
                    type:   'trim',
                    path:   'entity/straight-rail/straight-rail-' + directionName + '-backplates.png',
                    x:      0,
                    y:      0,
                    cols:   3,
                    rows:   1,
                    number: 0,
                    layer:  LAYER_BACKPLATES
                }
            ]
        };
    }

    function createCurvedTrackImage(directionName) {
        return {
            type:   'container',
            images: [
                {
                    type: 'sprite',
                    path: 'entity/curved-rail/curved-rail-' + directionName + '-stone-path-background.png',
                    x:    0,
                    y:    0,
                    layer:  LAYER_BG
                },
                {
                    type: 'sprite',
                    path: 'entity/curved-rail/curved-rail-' + directionName + '-stone-path.png',
                    x:    0,
                    y:    0,
                    layer:  LAYER_PATH
                },
                {
                    type: 'sprite',
                    path: 'entity/curved-rail/curved-rail-' + directionName + '-ties.png',
                    x:    0,
                    y:    0,
                    layer:  LAYER_TIES
                },
                {
                    type: 'sprite',
                    path: 'entity/curved-rail/curved-rail-' + directionName + '-backplates.png',
                    x:    0,
                    y:    0,
                    layer:  LAYER_BACKPLATES
                }
            ]
        };
    }

    function createStationImage(number) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'entity/train-stop/train-stop-ground.png',
                    x:      -10,
                    y:      0,
                    cols:   4,
                    rows:   1,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'entity/train-stop/train-stop-bottom.png',
                    x:      50,
                    y:      0,
                    cols:   4,
                    rows:   1,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'entity/train-stop/train-stop-top.png',
                    x:      10,
                    y:      -30,
                    cols:   4,
                    rows:   1,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'entity/train-stop/train-stop-top-mask.png',
                    x:      11,
                    y:      -26,
                    cols:   4,
                    rows:   1,
                    number: number,
                    mask:   true
                }
            ]
        };
    }

    function createRailChainSignalImage(number) {
        return {
            type:   'trim',
            path:   'entity/rail-chain-signal/rail-chain-signal.png',
            rows:   8,
            cols:   5,
            number: number * 5 + 3
        }
    }

    function createRailSignalImage(number) {
        return {
            type:   'trim',
            path:   'entity/rail-signal/rail-signal.png',
            rows:   8,
            cols:   3,
            number: number * 3
        };
    }

    return {
        'straight-rail':     {
            directions: {
                1: {
                    image:  createTrackImage('diagonal-right-top'),
                    offset: {x: -32, y: 0}
                },
                2: {
                    image:  createTrackImage('horizontal'),
                    offset: {x: 0, y: -32}
                },
                3: {
                    image:  createTrackImage('diagonal-right-bottom'),
                    offset: {x: -32, y: -32}
                },
                5: {
                    image:  createTrackImage('diagonal-left-bottom'),
                    offset: {x: 0, y: -32}
                },
                7: {
                    image:  createTrackImage('diagonal-left-top'),
                    offset: {x: 0, y: 0}
                }
            },
            image:      createTrackImage('vertical'),
            gridSize:   {w: 2, h: 2},
            offset:     {x: -32, y: 0}
        },
        'curved-rail':       {
            directions: {
                1: {
                    image:  createCurvedTrackImage('vertical-right-bottom'),
                    offset: {x: -48, y: -32}
                },
                2: {
                    image:    createCurvedTrackImage('horizontal-left-top'),
                    gridSize: {w: 8, h: 4},
                    offset:   {x: 0, y: -16}
                },
                3: {
                    image:    createCurvedTrackImage('horizontal-left-bottom'),
                    gridSize: {w: 8, h: 4},
                    offset:   {x: 0, y: -48}
                },
                4: {
                    image:  createCurvedTrackImage('vertical-right-top'),
                    offset: {x: -48, y: 0}
                },
                5: {
                    image:  createCurvedTrackImage('vertical-left-top'),
                    offset: {x: -16, y: 0}
                },
                6: {
                    image:    createCurvedTrackImage('horizontal-right-bottom'),
                    gridSize: {w: 8, h: 4},
                    offset:   {x: -32, y: -48}
                },
                7: {
                    image:    createCurvedTrackImage('horizontal-right-top'),
                    gridSize: {w: 8, h: 4},
                    offset:   {x: -32, y: -16}
                }
            },
            image:      createCurvedTrackImage('vertical-left-bottom'),
            gridSize:   {w: 4, h: 8},
            offset:     {x: -16, y: -32}
        },
        'train-stop':        {
            directions: {
                2: {
                    image: createStationImage(1)
                },
                4: {
                    image: createStationImage(2)
                },
                6: {
                    image: createStationImage(3)
                }
            },
            image:      createStationImage(0),
            gridSize:   {w: 2, h: 2},
            offset:     {x: -54, y: -64}
        },
        'rail-chain-signal': {
            directions: {
                1: {
                    image:  createRailChainSignalImage(1),
                    offset: {x: -32, y: -32}
                },
                2: {
                    image:  createRailChainSignalImage(2),
                    offset: {x: -64, y: -32},
                },
                3: {
                    image:  createRailChainSignalImage(3),
                    offset: {x: -96, y: -32}
                },
                4: {
                    image:  createRailChainSignalImage(4),
                    offset: {x: -128, y: -64}
                },
                5: {
                    image:  createRailChainSignalImage(5),
                    offset: {x: -96, y: -96}
                },
                6: {
                    image:  createRailChainSignalImage(6),
                    offset: {x: -64, y: -128}
                },
                7: {
                    image:  createRailChainSignalImage(7),
                    offset: {x: -32, y: -96}
                }
            },
            image:      createRailChainSignalImage(0),
            offset:     {x: -32, y: -64},
            gridSize:   {w: 1, h: 1}
        },
        'rail-signal':       {
            directions: {
                1: {
                    image: createRailSignalImage(1)
                },
                2: {
                    image: createRailSignalImage(2)
                },
                3: {
                    image: createRailSignalImage(3)
                },
                4: {
                    image: createRailSignalImage(4)
                },
                5: {
                    image: createRailSignalImage(5)
                },
                6: {
                    image: createRailSignalImage(6)
                },
                7: {
                    image: createRailSignalImage(7)
                }
            },
            image:      createRailSignalImage(0),
            offset:     {x: -32, y: -32},
            gridSize:   {w: 1, h: 1}
        }
    };
}