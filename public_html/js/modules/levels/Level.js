define({
    set: [{
            index: 0,
            backgroundImage: "assets/bg2.jpg",
            foregroundImage: "assets/lev1.png",
            map: {
                base: 150,
                width: 5000,
                obstacles: [
                    [0, 300, 0, 675], [300, 525, -1, 975], [525, 1700, 0, 450], [700, 1140, 0, 830], [1300, 1500, 0, 830], [1650, 1830, 0, 830], [2130, 2880, 0, 830], [3400, 4850, 0, 840], [2550, 2670, 0, 360], [2870, 3375, 0, 300],
                    [1850, 2050, 0, 640], [2250, 2350, 0, 435],
                    [700, 2180, 0, 1380], [2430, 2710, 0, 1430], [2910, 3670, 0, 1380], [3940, 4160, 0, 1380], [4290, 4490, 0, 1380], [4640, 5000, 0, 1380],
                    [0, 666, 0, 1900], [900, 1100, 0, 1900], [1400, 2180, 0, 1900], [0, 666, 0, 1900], [2430, 2890, 0, 1900], [3090, 3230, 0, 1815], [3370, 3570, 0, 1700], [3705, 3900, 0, 1575], [4080, 4730, 0, 1750], [3700, 3970, 0, 1980],
                    [1700, 1800, 0, 2300], [2040, 5000, 0, 2300],
                    [550, 840, 0, 2500], [1150, 1440, 0, 2500],
                    [0, 5000, 0, 2950], [1900, 2050, 0, 2035] // start,end,a,y

                ]
            },
            viewPortInitial: {
                x: 0,
                y: 0
            },
            actors: [
                {
                    type: "Hero",
                    position: {
                        x: 666,
                        y: 2800

                    },
                    instance: {}
                },
                {
                    type: "Boss",
                    position: {
                        x: 15,
                        y: 650
                    },
                    instance: {}
                },
                {
                    type: "Vergil",
                    position: {
                        x: 2500,
                        y: 800
                    },
                    instance: {}
                },
                {
                    type: "Vergil",
                    position: {
                        x: 1000,
                        y: 1350
                    },
                    instance: {}
                },
                {
                    type: "Beatrix",
                    position: {
                        x: 4000,
                        y: 1350
                    },
                    instance: {}
                },
                {
                    type: "Beatrix",
                    position: {
                        x: 4000,
                        y: 800
                    },
                    instance: {}
                },
                {
                    type: "Arwena",
                    position: {
                        x: 333,
                        y: 1850
                    },
                    instance: {}
                },
                {
                    type: "Vergil",
                    position: {
                        x: 2500,
                        y: 2300
                    },
                    instance: {}
                },
                {
                    type: "Beatrix",
                    position: {
                        x: 3000,
                        y: 2300
                    },
                    instance: {}
                },
                {
                    type: "Beatrix",
                    position: {
                        x: 3500,
                        y: 2300
                    },
                    instance: {}
                },
                {
                    type: "Arwena",
                    position: {
                        x: 333,
                        y: 2300
                    },
                    instance: {}
                },
                {
                    type: "Arwena",
                    position: {
                        x: 2500,
                        y: 1350
                    },
                    instance: {}
                },
                {
                    type: "Arwena",
                    position: {
                        x: 2000,
                        y: 1850
                    },
                    instance: {}
                },
                {
                    type: "Galadriela",
                    position: {
                        x: 3000,
                        y: 1350
                    },
                    instance: {}
                },
                {
                    type: "Galadriela",
                    position: {
                        x: 1900,
                        y: 620
                    },
                    instance: {}
                },
                {
                    type: "Sam",
                    position: {
                        x: 2500,
                        y: 2000
                    },
                    instance: {}
                },
                {
                    type: "Ladies",
                    position: {
                        x: 3500,
                        y: 1000
                    },
                    instance: {}
                }
            ],
            pickables: [
                {
                    type: "Heal",
                    position: {x: 1200, y: 380}
                },
                {
                    type: "Heal",
                    position: {x: 1000, y: 790}
                },
                {
                    type: "AmmoPack",
                    position: {x: 1200, y: 2890}
                },
                {
                    type: "AmmoPack",
                    position: {x: 100, y: 2980}
                }

            ]
        }]



});