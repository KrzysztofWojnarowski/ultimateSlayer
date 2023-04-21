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
                actors.push(this.generateActor("Hero")),blockData=[0,0,0,200];

            var chunk = this.generateChunk(allowedLevelElements,blockData);

            level =
                    {
                        index: index,
                        backgroundImage: "assets/bg2.jpg",
                        levelBrick: "assets/levBrick1.png",
                        map: {
                            base: 150,
                            width: xPosition+maxBlockLength*2,
                            obstacles: chunk.obstacles
                        },
                        viewPortInitial: {
                            x: 0,
                            y: 0
                        },
                        actors: actors.concat(chunk.actors),
                        pickables: chunk.pickables,
                    };


            return level;

        }
        this.signRandom = function () {
            return random() > 0.5 ? 1 : -1;
        }

        this.generateLevelBlock = function (chunk) {
            xPosition = chunk[1];
            yLevel = chunk[3];
            aCoeficient = chunk[2];
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
        this.generateAdditionalBlock = function(blockData){
            return [
                blockData[0],
                blockData[0]+Math.floor(random()*maxBlockLength)+160,
                0,
                blockData[2]*blockData[0]+blockData[3]-200 - Math.floor(random()*300)
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

        this.generateChunk = function(count,chunk){
            var x, obstacles = [], actors = [], actor, level = {},pickables=[];
            blockData = chunk;
            for (x = 0; x < count; x++) {
                // generate random actor from actors set
                actor = this.generateActor(actorTypes[Math.floor(random()*(actorTypes.length-1))]);
                var blockData = this.generateLevelBlock(blockData); 
                obstacles.push(blockData);
                if (random()<additionalBlockPropability){   
                    obstacles.push(this.generateAdditionalBlock(blockData));
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
            return {
                obstacles:obstacles,
                actors:actors,
                pickables:pickables
            }
        }




    }


    return (LevelGenerator);

});