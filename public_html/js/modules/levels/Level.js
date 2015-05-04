define({
    set: [{
            index: 0,
            backgroundImage: "assets/bg1.jpg",
            foregroundImage: "assets/lev1.png",
            
            map:{
                base:150,
                width:9000,
                obstacles:[
                    [0,300,0,675],
                    [300,525,-1,975],
                    [525,1700,0,450],
                    [700,1140,0,830],
                    [1300,1500,0,830],
                    [1650,1830,0,830],
                    [2130,2880,0,830],
                    [2550,2670,0,360],
                    [2870,3375,0,300],
                    [1850,2050,0,640],[2250,2350,0,435],[0,666,0,1900],
                    [0,5000,0,2950],[1900,2050,0,2035], // start,end,a,y
                          
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