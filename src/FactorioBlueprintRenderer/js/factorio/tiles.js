const FactorioBlueprintReader = require("./factorioBlueprintReader");

FactorioBlueprintReader.tiles = {
    'concrete':              {
        image: {
            type: 'random_trim',
            path: 'terrain/concrete/concrete1.png',
            from: 0,
            to:   15,
            cols: 16,
            rows: 1
        }
    },
    'hazard-concrete-left':  {
        image: {
            type: 'random_trim',
            path: 'terrain/hazard-concrete-left/hazard-concrete1-left.png',
            from: 0,
            to:   15,
            cols: 16,
            rows: 1
        }
    },
    'hazard-concrete-right': {
        image: {
            type: 'random_trim',
            path: 'terrain/hazard-concrete-right/hazard-concrete1-right.png',
            from: 0,
            to:   15,
            cols: 16,
            rows: 1
        }
    },
    'stone-path':            {
        image: {
            type: 'random_trim',
            path: 'terrain/stone-path/stone-path-1.png',
            from: 0,
            to:   15,
            cols: 16,
            rows: 1
        }
    }
};