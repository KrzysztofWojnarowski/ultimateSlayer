define({
    set: [{
            index: 0,
            backgroundImage: "assets/bg1.jpg",
            foregroundImage: "assets/level1.png",
            
            map:{
                base:150,
                width:8000,
                obstacles:[
                    [0,190,0,150],
                    [190,400,0,-100],
                    [190,300,-1,345],
                    [300,8000,0,50], // start,end,a,b
                          
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