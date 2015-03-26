define({
    set: [{
            index: 0,
            backgroundImage: "assets/bg1.jpg",
            foregroundImage: "assets/level0F.png",
            map:{
                base:300,
                width:6000,
                obstacles:[200,200,300, //baseLevel,start,end
                          250,400,450,
                          250,1000,2000,
                          200,1500,1800
                          
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
                        x: 0,
                        y: 220
                    },
                    instance:{}
                }
            ]
        }]



});