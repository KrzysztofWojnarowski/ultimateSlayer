define({
    set: [{
            index: 0,
            backgroundImage: "assets/bg1.jpg",
            foregroundImage: "assets/lev1.png",
            
            map:{
                base:150,
                width:8000,
                obstacles:[
                    [0,190,0,150],
                    [190,400,0,-100],
                    [190,300,-1,345],
                    [0,8000,0,800], // start,end,a,b
                          
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
                        x: 10,
                        y: 20
                    },
                    instance:{}
                },
                
             {
                    type: "Beatrix",
                    position: {
                        x: 210,
                        y: 20
                    },
                    instance:{}
                },
              
               
                 {
                    type: "Vergil",
                    position: {
                        x: 890,
                        y: 20
                    },
                    instance:{}
                }
            ]
        }]



});