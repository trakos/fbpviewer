const forEach = require("lodash.foreach");

exports.iconSize = 32;
exports.icons = (function () {
    const OVERLAY_LAYER = 200;

    var items = [
        "accumulator",
        "advanced-circuit",
        "arithmetic-combinator",
        "artillery-wagon",
        "assembling-machine-1",
        "assembling-machine-2",
        "assembling-machine-3",
        "atomic-bomb",
        "automation-science-pack",
        "battery",
        "battery-equipment",
        "battery-mk2-equipment",
        "beacon",
        "big-electric-pole",
        "blueprint",
        "blueprint-book",
        "boiler",
        "burner-inserter",
        "burner-mining-drill",
        "cannon-shell",
        "car",
        "cargo-wagon",
        "centrifuge",
        "chemical-plant",
        "chemical-science-pack",
        "cluster-grenade",
        //"coal", but we use coal-dark-background instead
        "combat-shotgun",
        "concrete",
        "constant-combinator",
        "construction-robot",
        "copper-cable",
        "copper-ore",
        "copper-plate",
        "decider-combinator",
        "deconstruction-planner",
        "defender",
        "destroyer",
        "distractor",
        "effectivity-module",
        "effectivity-module-2",
        "effectivity-module-3",
        "electric-engine-unit",
        "electric-furnace",
        "electric-mining-drill",
        "electronic-circuit",
        "energy-shield-equipment",
        "energy-shield-mk2-equipment",
        "engine-unit",
        "exoskeleton-equipment",
        "explosive-cannon-shell",
        "explosive-rocket",
        "explosives",
        "explosive-uranium-cannon-shell",
        "express-splitter",
        "express-transport-belt",
        "express-underground-belt",
        "fast-inserter",
        "fast-splitter",
        "fast-transport-belt",
        "fast-underground-belt",
        "filter-inserter",
        "firearm-magazine",
        "flamethrower",
        "flamethrower-ammo",
        "flamethrower-turret",
        "fluid-wagon",
        "flying-robot-frame",
        "fusion-reactor-equipment",
        "gate",
        "grenade",
        "gun-turret",
        "hazard-concrete",
        "heat-pipe",
        "inserter",
        "iron-chest",
        "iron-gear-wheel",
        "iron-ore",
        "iron-plate",
        "iron-stick",
        "lab",
        "landfill",
        "land-mine",
        "laser-turret",
        "light-armor",
        "locomotive",
        "logistic-chest-active-provider",
        "logistic-chest-buffer",
        "logistic-chest-passive-provider",
        "logistic-chest-requester",
        "logistic-chest-storage",
        "logistic-robot",
        "logistic-science-pack",
        "long-handed-inserter",
        "low-density-structure",
        "medium-electric-pole",
        "military-science-pack",
        "modular-armor",
        "night-vision-equipment",
        "nuclear-fuel",
        "nuclear-reactor",
        "offshore-pump",
        "oil-refinery",
        "personal-laser-defense-equipment",
        "personal-roboport-equipment",
        "personal-roboport-mk2-equipment",
        "piercing-rounds-magazine",
        "piercing-shotgun-shell",
        "pipe",
        "pipe-to-ground",
        "pistol",
        "plastic-bar",
        "poison-capsule",
        "power-armor",
        "power-armor-mk2",
        "power-switch",
        "processing-unit",
        "production-science-pack",
        "productivity-module",
        "productivity-module-2",
        "productivity-module-3",
        "programmable-speaker",
        "pump",
        "pumpjack",
        "radar",
        "rail",
        "rail-chain-signal",
        "rail-signal",
        "red-wire",
        "refined-concrete",
        "refined-hazard-concrete",
        "repair-pack",
        "roboport",
        "rocket",
        "rocket-control-unit",
        "rocket-fuel",
        "rocket-launcher",
        "rocket-part",
        "rocket-silo",
        "satellite",
        "shotgun",
        "shotgun-shell",
        "slowdown-capsule",
        "small-electric-pole",
        "small-lamp",
        "solar-panel",
        "solar-panel-equipment",
        "solid-fuel",
        "space-science-pack",
        "speed-module",
        "speed-module-2",
        "speed-module-3",
        "spidertron-remote",
        "spidertron",
        "splitter",
        "stack-filter-inserter",
        "stack-inserter",
        "steam-engine",
        "steam-turbine",
        "steel-axe",
        "steel-chest",
        "steel-furnace",
        "steel-plate",
        "stone",
        "stone-brick",
        "stone-furnace",
        "storage-tank",
        "submachine-gun",
        "substation",
        "sulfur",
        "tank",
        "train-stop",
        "transport-belt",
        "underground-belt",
        "uranium-235",
        "uranium-238",
        "uranium-cannon-shell",
        "uranium-fuel-cell",
        "uranium-ore",
        "uranium-processing",
        "uranium-rounds-magazine",
        "used-up-uranium-fuel-cell",
        "utility-science-pack",
        "wall",
        "wood",
        "wooden-chest"
    ];

    var itemsWithSpecialNames = {
        "coal":                     "base/graphics/icons/coal-dark-background.png",
        "empty-barrel":             "base/graphics/icons/fluid/barreling/empty-barrel.png",
        "heat-exchanger":           "base/graphics/icons/heat-boiler.png",
        "raw-fish":                 "base/graphics/icons/fish.png",
        "stone-wall":               "base/graphics/icons/wall.png",
        "discharge-defense-remote": "base/graphics/equipment/discharge-defense-equipment.png",
    };

    var recipes = {
        "kovarex-enrichment-process": "kovarex-enrichment-process.png",
        "uranium-processing":         "uranium-processing.png",
        "nuclear-fuel-reprocessing":  "nuclear-fuel-reprocessing.png",

        "solid-fuel-from-heavy-oil":     "solid-fuel-from-heavy-oil.png",
        "solid-fuel-from-light-oil":     "solid-fuel-from-light-oil.png",
        "solid-fuel-from-petroleum-gas": "solid-fuel-from-petroleum-gas.png",
        "advanced-oil-processing":       "fluid/advanced-oil-processing.png",
        "basic-oil-processing":          "fluid/basic-oil-processing.png",
        "coal-liquefaction":             "fluid/coal-liquefaction.png",
        "heavy-oil-cracking":            "fluid/heavy-oil-cracking.png",
        "light-oil-cracking":            "fluid/light-oil-cracking.png"
    };

    var fluids = {
        "petroleum-gas": {r: 0.3, g: 0.1, b: 0.3},
        "water":         {r: 0, g: 0.34, b: 0.6},
        "sulfuric-acid": {r: 0.75, g: 0.65, b: 0.1},
        "crude-oil":     {r: 0, g: 0, b: 0},
        "heavy-oil":     {r: 0.5, g: 0.04, b: 0},
        "light-oil":     {r: 0.57, g: 0.33, b: 0},
        "lubricant":     {r: 0.15, g: 0.32, b: 0.03}
    };

    var gases = {
        steam: {r: 0, g: 0.34, b: 0.6}
    };

    var signalColors = [
        'black', 'blue', 'cyan', 'green', 'grey', 'pink', 'red', 'white', 'yellow'
    ];

    var allIcons = {};

    forEach(items, function (itemName) {
        allIcons[itemName] = {
            image: {
                type:   'trim',
                path:   'base/graphics/icons/' + itemName + '.png',
                anchor: {x: 0.5, y: 0.5},
                scale:  {x: 0.5, y: 0.5},
                layer:  OVERLAY_LAYER,
                cols:   2,
                rows:   1,
                number: 0,
                x:      0,
                y:      0
            }
        };
    });

    forEach(itemsWithSpecialNames, function (imageName, itemName) {
        allIcons[itemName] = {
            image: {
                type:   'trim',
                path:   imageName,
                anchor: {x: 0.5, y: 0.5},
                scale:  {x: 0.5, y: 0.5},
                layer:  OVERLAY_LAYER,
                cols:   2,
                rows:   1,
                number: 0,
                x:      0,
                y:      0
            }
        };
    });

    forEach(recipes, function (iconName, recipeName) {
        allIcons[recipeName] = {
            image: {
                type:   'trim',
                path:   'base/graphics/icons/' + iconName,
                anchor: {x: 0.5, y: 0.5},
                scale:  {x: 0.5, y: 0.5},
                layer:  OVERLAY_LAYER,
                cols:   2,
                rows:   1,
                number: 0,
                x:      0,
                y:      0
            }
        };
    });

    forEach(fluids, function (fluidDetails, fluidName) {
        allIcons[fluidName] = {
            image: {
                type:   'trim',
                path:   'base/graphics/icons/fluid/' + fluidName + '.png',
                anchor: {x: 0.5, y: 0.5},
                scale:  {x: 0.5, y: 0.5},
                layer:  OVERLAY_LAYER,
                cols:   2,
                rows:   1,
                number: 0,
                x:      0,
                y:      0
            }
        };
        allIcons[fluidName + '-barrel'] = {
            image: {
                type:   'trim',
                path:   'base/graphics/icons/fluid/' + fluidName + '.png',
                anchor: {x: 0.5, y: 0.5},
                scale:  {x: 0.5, y: 0.5},
                layer:  OVERLAY_LAYER,
                cols:   2,
                rows:   1,
                number: 0,
                x:      0,
                y:      0
            }
        };
        allIcons['empty-' + fluidName + '-barrel'] = {
            image: {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'base/graphics/icons/fluid/barreling/barrel-empty.png',
                        anchor: {x: 0.5, y: 0.5},
                        scale:  {x: 0.5, y: 0.5},
                        layer:  OVERLAY_LAYER,
                        cols:   2,
                        rows:   1,
                        number: 0,
                        x:      0,
                        y:      0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/icons/fluid/' + fluidName + '.png',
                        anchor: {x: 0.5, y: 0.5},
                        scale:  {x: 0.25, y: 0.25},
                        layer:  OVERLAY_LAYER,
                        cols:   2,
                        rows:   1,
                        number: 0,
                        x:      6,
                        y:      8
                    }
                ]
            }
        };
        allIcons['fill-' + fluidName + '-barrel'] = {
            image: {
                type:   'container',
                images: [
                    {
                        type:   'trim',
                        path:   'base/graphics/icons/fluid/barreling/barrel-fill.png',
                        anchor: {x: 0.5, y: 0.5},
                        scale:  {x: 0.5, y: 0.5},
                        layer:  OVERLAY_LAYER,
                        cols:   2,
                        rows:   1,
                        number: 0,
                        x:      0,
                        y:      0
                    },
                    {
                        type:   'trim',
                        path:   'base/graphics/icons/fluid/' + fluidName + '.png',
                        anchor: {x: 0.5, y: 0.5},
                        scale:  {x: 0.25, y: 0.25},
                        layer:  OVERLAY_LAYER,
                        cols:   2,
                        rows:   1,
                        number: 0,
                        x:      2,
                        y:      -2
                    }
                ]
            }
        };
        for (var k = 0; k < 10; k++) {
            allIcons['signal-' + k] = {
                image: {
                    type:   'trim',
                    path:   'base/graphics/icons/signal/signal_' + k + '.png',
                    anchor: {x: 0.5, y: 0.5},
                    scale:  {x: 0.5, y: 0.5},
                    layer:  OVERLAY_LAYER,
                    cols:   2,
                    rows:   1,
                    number: 0,
                    x:      0,
                    y:      0
                }
            };
        }
        for (var letterCode = 'A'.charCodeAt(0); letterCode <= 'Z'.charCodeAt(0); letterCode++) {
            var letter = String.fromCharCode(letterCode);
            allIcons['signal-' + letter] = {
                image: {
                    type:   'trim',
                    path:   'base/graphics/icons/signal/signal_' + letter + '.png',
                    anchor: {x: 0.5, y: 0.5},
                    scale:  {x: 0.5, y: 0.5},
                    layer:  OVERLAY_LAYER,
                    cols:   2,
                    rows:   1,
                    number: 0,
                    x:      0,
                    y:      0
                }
            };
        }
        forEach(signalColors, function (color) {
            allIcons['signal-' + color] = {
                image: {
                    type:   'trim',
                    path:   'base/graphics/icons/signal/signal_' + color + '.png',
                    anchor: {x: 0.5, y: 0.5},
                    scale:  {x: 0.5, y: 0.5},
                    layer:  OVERLAY_LAYER,
                    cols:   2,
                    rows:   1,
                    number: 0,
                    x:      0,
                    y:      0
                }
            };
        })
    });

    return allIcons;
})();