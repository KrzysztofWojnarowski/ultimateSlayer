define([], function () {

    var LevelGenerator = function () {
        var currentPoint,
                yLevel = Math.round(Math.random() * 500),
                xPosition = 0,
                aCoeficient = 0,
                allowedAngleChangeFactor = 0.20,
                allowedLevelChangeFactor = 50, //height step
                actorGeneratePropability = 0.7,
                pickableGeneratePropability = 0.1,
                maxBlockLength = 800,
                allowedLevelElements = 50, //how many lines may we generate
                additionalBlockPropability=0.5,
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
            var x, obstacles = [], actors = [], actor, pickable, level = {};
            actors.push(this.generateActor("Hero"));
            for (x = 0; x < allowedLevelElements; x++) {
                // generate random actor from actors set
                actor = this.generateActor(actorTypes[Math.round(Math.random()*(actorTypes.length-1))]);
                obstacles.push(this.generateLevelBlock());
                if (Math.random()<additionalBlockPropability){
                    
                    obstacles.push(this.generateAdditionalBlock());
                    
                }
                if(actor && Math.random()<actorGeneratePropability){
                    actors.push(actor);
                }
                // add condition on generating enemy and pickables
            }
            actors.push(this.generateActor("Boss"));

            level =
                    {
                        index: index,
                        backgroundImage: "assets/bg2.jpg",
                        levelBrick: "assets/levBrick1.png",
                        map: {
                            base: 150,
                            width: 50000,
                            obstacles: obstacles
                        },
                        viewPortInitial: {
                            x: 0,
                            y: 0
                        },
                        actors: actors,
                        pickables: [{
                                type: "Heal",
                                position: {x: 1200, y: 380}
                            }],
                    };


            return level;

        }
        this.signRandom = function () {
            return Math.random() > 0.5 ? 1 : -1;
        }

        this.generateLevelBlock = function () {
            var length = Math.round(Math.random() * maxBlockLength)+150,
                    startPosition = xPosition-60,
                    endPosition = xPosition + length,
                    
                    angleFactor =  Math.random() * allowedAngleChangeFactor * this.signRandom(),
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
                xPosition+Math.round(Math.random()*maxBlockLength)+160,
                0,
                aCoeficient*xPosition+yLevel-200 - Math.round(Math.random()*300)
            ];
        }

        this.generateActor = function (type) {
            return (Math.random() < actorGeneratePropability || type) ?
                    {
                        type: type ? type : ActorTypes[Math.round(Math.random() * (ActorTypes.length - 1))],
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