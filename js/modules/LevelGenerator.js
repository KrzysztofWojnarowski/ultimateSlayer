define([], function () {

    var xn=0.1;
    _step = function(){
        let k = xn > 0.5 ?4 :3.9;
        return xn* k*(1 - xn);
      };
    random = function(){
        xn = _step();
        return xn;
    };

    var LevelGenerator = function () {
        var     yLevel = Math.floor(random() * 500),
                xPosition = 0,
                aCoeficient = 0,
                allowedAngleChangeFactor = 0.3,
                actorGeneratePropability = 0.2,
                maxBlockLength = 40,
                allowedLevelElements = 120, //how many lines may we generate
                additionalBlockPropability=0.3,
                actorTypes = [
                    "Vergil",
                    "Beatrix",
                    "Arwena",
                    "Galadriela",
                    "Sam",
                    "Ladies"
                ],
                pickables = [
                    "Heal",
                    "AmmoPack"
                ];




        this.generateLevel = function (index) {
            var x, obstacles = [], actors = [], actor, level = {},pickables=[];
                actors.push(this.generateActor("Hero"));
            for (x = 0; x < allowedLevelElements; x++) {
                // generate random actor from actors set
                actor = this.generateActor(actorTypes[Math.floor(random()*(actorTypes.length-1))]);
                var blockData = this.generateLevelBlock(); 
                obstacles.push(blockData);
                if (random()<additionalBlockPropability){   
                    obstacles.push(this.generateAdditionalBlock());
                }
                if (random()<0.1){   
                    pickables.push({
                        type: "Heal",
                        position: {x: blockData[0], y:blockData[3]-50}
                    });
                }


                if(actor && random()<actorGeneratePropability){
                    actors.push(actor);
                }
                if (x===(allowedLevelElements-2)){
                    actors.push(this.generateActor("Boss"));
                    
                }
            }

            level =
                    {
                        index: index,
                        backgroundImage: "assets/bg2.jpg",
                        levelBrick: "assets/levBrick1.png",
                        map: {
                            base: 150,
                            width: xPosition+maxBlockLength*2,
                            obstacles: obstacles
                        },
                        viewPortInitial: {
                            x: 0,
                            y: 0
                        },
                        actors: actors,
                        pickables: pickables,
                    };


            return level;

        }
        this.signRandom = function () {
            return random() > 0.5 ? 1 : -1;
        }

        this.generateLevelBlock = function () {
            var length = Math.floor(random() * maxBlockLength)+150,
                    startPosition = xPosition-60,
                    endPosition = xPosition + length,
                    
                    angleFactor =  random() * allowedAngleChangeFactor * this.signRandom(),
                    yStart = (aCoeficient-angleFactor)*startPosition+yLevel ;
           
            
            xPosition = endPosition;
            aCoeficient = angleFactor;
            yLevel = yStart;
            return [
                startPosition,
                endPosition,
                angleFactor,
                yStart
            ];

        };
        this.generateAdditionalBlock = function(){
            return [
                xPosition,
                xPosition+Math.floor(random()*maxBlockLength)+160,
                0,
                aCoeficient*xPosition+yLevel-200 - Math.floor(random()*300)
            ];
        }

        this.generateActor = function (type) {
            return (random() < actorGeneratePropability || type) ?
                    {
                        type: type ? type : ActorTypes[Math.floor(random() * (ActorTypes.length - 1))],
                        position: {
                            x: xPosition-100,
                            y: aCoeficient*xPosition+yLevel-100
                        },
                        instance: {}
                    } : false;
        };






    }


    return (LevelGenerator);

});