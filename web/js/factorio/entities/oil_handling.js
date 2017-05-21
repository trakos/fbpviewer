var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

FactorioBlueprintReader.createEntitiesFunctions.push(function () {
    return {

        'chemical-plant':         {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 1,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        5,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        79,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        5,
                                y:        84
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 1.5,
                                x:        79,
                                y:        84
                            }
                        ]
                    }
                },
                4: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 2,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        5,
                                y:        -5
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        66,
                                y:        -5
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        5,
                                y:        75
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0,
                                x:        66,
                                y:        75
                            }
                        ]
                    }
                },
                6: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/chemical-plant/chemical-plant.png',
                                number: 3,
                                cols:   4,
                                rows:   1,
                                x:      -20,
                                y:      -25
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        10,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        89,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        10,
                                y:        84
                            },
                            {
                                type:     'sprite',
                                path:     'core/fluid-indication-arrow.png',
                                scale:    {x: 0.5, y: 0.5},
                                rotation: 0.5,
                                x:        89,
                                y:        84
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
                        path:   'entity/chemical-plant/chemical-plant.png',
                        number: 0,
                        cols:   4,
                        rows:   1,
                        x:      -20,
                        y:      -25
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        15,
                        y:        8
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        79,
                        y:        8
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        15,
                        y:        90
                    },
                    {
                        type:     'sprite',
                        path:     'core/fluid-indication-arrow.png',
                        scale:    {x: 0.5, y: 0.5},
                        rotation: 1,
                        x:        79,
                        y:        90
                    }
                ]
            },
            gridSize:   {w: 3, h: 3},
            offset:     {x: 0, y: 0}
        },
        'oil-refinery':           {
            image:    {
                type:   'trim',
                path:   'entity/oil-refinery/oil-refinery.png',
                number: 0,
                cols:   4,
                rows:   1
            },
            gridSize: {w: 5, h: 5},
            offset:   {x: 0, y: 0}
        },
    };
});