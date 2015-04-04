define(function() {

    var ViewPort = function() {
        this.drawContext = {};
        this.bufferContext = {};
        this.window = {};
        this.init = function(viewPortConfig) {
            var canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            this.drawContext = canvas.getContext("2d");
            this.drawContext.canvas.width = viewPortConfig.width;
            this.drawContext.canvas.height = viewPortConfig.height;
            this.drawContext.scale(viewPortConfig.scale.x, viewPortConfig.scale.y);
            var buffer = document.createElement("canvas");
            this.bufferContext = buffer.getContext("2d");
            this.bufferContext.scale(viewPortConfig.scale.x, viewPortConfig.scale.y);
            this.bufferContext.canvas.width = viewPortConfig.width;
            this.bufferContext.canvas.height = viewPortConfig.height;
            this.animateTicker = 0;

        };


        this.getPerspective = function() {
            return this.camera.perspective;
        };
        this.getPosition = function() {
            return this.camera.position;
        };
        this.setPosition = function(actor) {
            this.camera.position.x -= 8;
            this.camera.position.y = 0;
        };
        this.setPerspective = function() {
            this.camera.perspective.x -= 1;
            this.camera.perspective.y = 0;
        };

        this.camera = {
            position: {
                x: 0,
                y: 0
            },
            maxPerspective: 0,
            perspectiveRatio: 0,
            traceWindow: {
                start: 0,
                end: 0
            },
            perspective: {
                x: 0, y: 0
            },
            size: {
                width: 0,
                heigth: 0
            }

        };

        this.initCamera = function(game) {
            var level = game.getLevel();


            this.camera.position = {
                x: 0, y: 0
            };
            this.camera.traceWindow = {
                start: ~~this.drawContext.canvas.width * 0.2,
                end: ~~this.drawContext.canvas.width * 0.9

            };
            this.camera.size = {
                width: this.drawContext.canvas.width,
                heigth: this.drawContext.canvas.height
            };
            this.camera.maxPerspective = level.imageData.background.naturalWidth;
            this.camera.maxRight = level.map.width - this.camera.size.width / 2;
            this.camera.perspectiveRatio = level.imageData.background.naturalWidth / level.map.width;




        };

        this.updateCamera = function(actorObj) {
            var camera = this.camera, aPos = actorObj.instance.position.x;
            camera.position.y = 100-actorObj.instance.position.y;
            if (aPos > camera.traceWindow.start &&
                    aPos < camera.traceWindow.end &&
                    camera.position.x < camera.maxRight
                    ) {
                camera.position.x = -aPos + camera.traceWindow.start;
                camera.perspective.x = ~~camera.position.x * camera.perspectiveRatio;
            }
            //    console.log(camera.position.x+aPos);
        };

        this.drawLevel = function(level) {
            var camera = this.camera;
            this.animateTicker += 1;
            this.updateCamera(level.actors[0]);
            this.drawContext.drawImage(level.imageData.background, camera.perspective.x,camera.position.y*0.1-200);
            this.drawContext.drawImage(level.imageData.foreground, camera.position.x, camera.position.y);
            var actors = level.actors;
            for (var x in actors) {
                this.drawActor(actors[x].instance);
            }
        };
        

        this.drawActor = function(actor) {
            if (this.animateTicker % 3 === 0) {
                actor.frame += 1;
            }
            
            if (actor.animation.frames <= actor.frame ) {
                if (actor.animation.loop === true) {
                    actor.frame = 1;

                } else {
                    actor.frame-= 1;
                }
            }
            this.drawContext.drawImage(actor.sprite,
                    actor.entity.meshData.width * actor.frame,
                    actor.animation.offset,
                    actor.entity.meshData.width,
                    actor.entity.meshData.height,
                    actor.position.x + this.camera.position.x, actor.position.y + this.camera.position.y,
                    actor.entity.meshData.width,
                    actor.entity.meshData.height);
        };
        this.inSight = function(realNumber){
            
            if (realNumber>=this.camera.position.x && realNumber<=this.camera.size.width){
                return true;
            }
            return false;
        };




        this.assambleActor = function(actor) {
        };
        this.drawLevelWireframe = function(level){
            this.drawContext.beginPath();
            this.drawContext.color="#dadada";
            for (x in level.map.obstacles){
                this.drawContext.moveTo((level.map.obstacles[x][0])+this.camera.position.x,(level.map.obstacles[x][0]*level.map.obstacles[x][2]+level.map.obstacles[x][3])+this.camera.position.y+65);
                this.drawContext.lineTo((level.map.obstacles[x][1])+this.camera.position.x,(level.map.obstacles[x][1]*level.map.obstacles[x][2]+level.map.obstacles[x][3])+this.camera.position.y+65);
                
            }
            this.drawContext.stroke();
            this.drawContext.closePath();
        }

    };



    return (ViewPort);


});