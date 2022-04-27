module.exports = function () {
    function createLocomotiveImage(directionString, number) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'base/graphics/entity/diesel-locomotive/diesel-locomotive-shadow-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'base/graphics/entity/diesel-locomotive/diesel-locomotive-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'base/graphics/entity/diesel-locomotive/diesel-locomotive-mask-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number,
                    mask:   true
                },
            ]
        };
    }

    function createCargoWagon(directionString, number) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'base/graphics/entity/cargo-wagon/cargo-wagon-shadow-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'base/graphics/entity/cargo-wagon/cargo-wagon-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
            ]
        };
    }

    function createFluidWagon(directionString, number) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'base/graphics/entity/fluid-wagon/fluid-wagon-shadow-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'base/graphics/entity/fluid-wagon/fluid-wagon-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   8,
                    number: number
                },
            ]
        };
    }

    function createArtilleryWagon(directionString, number) {
        return {
            type:   'container',
            images: [
                {
                    type:   'trim',
                    path:   'base/graphics/entity/artillery-wagon/artillery-wagon-base-shadow-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   4,
                    number: number
                },
                {
                    type:   'trim',
                    path:   'base/graphics/entity/artillery-wagon/artillery-wagon-base-' + directionString + '.png',
                    x:      0,
                    y:      0,
                    cols:   4,
                    rows:   4,
                    number: number
                },
            ]
        };
    }

    // I don't support exact orientation, instead I'm approximating direction from orientation.
    // I've chosen those that look best on default train directions,
    // as locomotives are rarely placed on curved tracks (in blueprints).
    return {
        'locomotive':  {
            directions: {
                1: {
                    image: createLocomotiveImage('01', 0)
                },
                2: {
                    image: createLocomotiveImage('01', 26)
                },
                3: {
                    image: createLocomotiveImage('03', 0)
                },
                4: {
                    image: createLocomotiveImage('04', 6)
                },
                5: {
                    image: createLocomotiveImage('05', 0)
                },
                6: {
                    image: createLocomotiveImage('05', 26)
                },
                7: {
                    image: createLocomotiveImage('07', 0)
                }
            },
            image:      createLocomotiveImage('08', 6),
            offset:     {x: 0, y: -80},
            gridSize:   {w: 7, h: 2}
        },
        'cargo-wagon': {
            directions: {
                1: {
                    image: createCargoWagon('1', 0)
                },
                2: {
                    image: createCargoWagon('1', 26)
                },
                3: {
                    image: createCargoWagon('3', 0)
                },
                4: {
                    image: createCargoWagon('4', 6)
                },
                5: {
                    image: createCargoWagon('1', 0)
                },
                6: {
                    image: createCargoWagon('1', 24)
                },
                7: {
                    image: createCargoWagon('3', 0)
                }
            },
            image:      createCargoWagon('4', 6),
            offset:     {x: 0, y: -80},
            gridSize:   {w: 7, h: 2}
        },
        'fluid-wagon': {
            directions: {
                1: {
                    image: createFluidWagon('1', 0)
                },
                2: {
                    image: createFluidWagon('1', 26)
                },
                3: {
                    image: createFluidWagon('3', 0)
                },
                4: {
                    image: createFluidWagon('4', 6)
                },
                5: {
                    image: createFluidWagon('1', 0)
                },
                6: {
                    image: createFluidWagon('1', 24)
                },
                7: {
                    image: createFluidWagon('3', 0)
                }
            },
            image:      createFluidWagon('4', 6),
            offset:     {x: 0, y: -80},
            gridSize:   {w: 7, h: 2}
        },
        'artillery-wagon': {
            directions: {
                1: {
                    image: createArtilleryWagon('1', 0)
                },
                2: {
                    image: createArtilleryWagon('2', 10)
                },
                3: {
                    image: createArtilleryWagon('5', 0)
                },
                4: {
                    image: createArtilleryWagon('7', 6)
                },
                5: {
                    image: createArtilleryWagon('9', 0)
                },
                6: {
                    image: createArtilleryWagon('10', 10)
                },
                7: {
                    image: createArtilleryWagon('13', 0)
                }
            },
            image:      createArtilleryWagon('15', 6),
            offset:     {x: 0, y: -80},
            gridSize:   {w: 7, h: 2}
        }
    };
}