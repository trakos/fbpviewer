var FactorioBlueprintReader = FactorioBlueprintReader || {};

FactorioBlueprintReader.createEntitiesFunctions = FactorioBlueprintReader.createEntitiesFunctions || [];

(function () {
    function prepareInserterData(inserterName) {
        return {
            directions: {
                2: {
                    image: {
                        type:   'container',
                        images: [
                            {
                                type:   'trim',
                                path:   'entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 3,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.5},
                                rotation: 0.65,
                                x:        45,
                                y:        18
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.8},
                                rotation: 0.3,
                                x:        27,
                                y:        18
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 1.5,
                                x:        8,
                                y:        22
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
                                path:   'entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 0,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.3},
                                rotation: 1,
                                x:        21,
                                y:        23
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.7},
                                rotation: 1,
                                x:        21,
                                y:        40
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0,
                                x:        15,
                                y:        8
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
                                path:   'entity/' + inserterName + '/' + inserterName + '-platform.png',
                                number: 1,
                                cols:   4,
                                rows:   1,
                                x:      0,
                                y:      0
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                                scale:    {x: 1, y: 0.5},
                                rotation: 1.35,
                                x:        -4,
                                y:        14
                            },
                            {
                                type:     'sprite',
                                path:     'entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                                scale:    {x: 1, y: 0.8},
                                rotation: 1.7,
                                x:        13,
                                y:        16
                            },
                            {
                                type:     'sprite',
                                path:     'core/indication-arrow-gui-ascending.png',
                                scale:    {x: 0.25, y: 0.25},
                                rotation: 0.5,
                                x:        33,
                                y:        22
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
                        path:   'entity/' + inserterName + '/' + inserterName + '-platform.png',
                        number: 2,
                        cols:   4,
                        rows:   1,
                        x:      0,
                        y:      0
                    },
                    {
                        type:     'sprite',
                        path:     'entity/' + inserterName + '/' + inserterName + '-hand-open.png',
                        scale:    {x: 1, y: 0.3},
                        rotation: 1,
                        x:        19,
                        y:        0
                    },
                    {
                        type:     'sprite',
                        path:     'entity/' + inserterName + '/' + inserterName + '-hand-base.png',
                        scale:    {x: 1, y: 1},
                        rotation: 0,
                        x:        15,
                        y:        -5
                    },
                    {
                        type:     'sprite',
                        path:     'core/indication-arrow-gui-ascending.png',
                        scale:    {x: 0.25, y: 0.25},
                        rotation: 1,
                        x:        20,
                        y:        35
                    }
                ]
            },
            gridSize:   {w: 1, h: 1},
            offset:     {x: -5, y: -7}
        };
    }

    FactorioBlueprintReader.createEntitiesFunctions.push(function () {
        return {
            'burner-inserter':       prepareInserterData('burner-inserter'),
            'fast-inserter':         prepareInserterData('fast-inserter'),
            'filter-inserter':       prepareInserterData('filter-inserter'),
            'inserter':              prepareInserterData('inserter'),
            'stack-inserter':        prepareInserterData('stack-inserter'),
            'stack-filter-inserter': prepareInserterData('stack-filter-inserter')
        };
    });

})();




