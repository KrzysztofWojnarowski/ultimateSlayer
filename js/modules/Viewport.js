define(function () {

    var ViewPort = function () {
        this.drawContext = {};
        this.bufferContext = {};
        this.window = {};
        this.init = function (viewPortConfig) {
            var canvas = document.createElement("canvas");
            canvas.setAttribute("class","viewport");
            
            document.body.appendChild(canvas);
            
            this.drawContext = canvas.getContext("2d");
            this.drawContext.canvas.width = viewPortConfig.width;
            this.drawContext.canvas.height = viewPortConfig.height;
            this.drawContext.scale(viewPortConfig.scale.x, viewPortConfig.scale.y);
            this.scale ={ x:viewPortConfig.scale.x,
                y:viewPortConfig.scale.y};
            
            this.animateTicker = 0;

        };
        this.getPerspective = function () {
            return this.camera.perspective;
        };
        this.getPosition = function () {
            return this.camera.position;
        };
        this.setPosition = function (actor) {
            this.camera.position.x -= 8;
            this.camera.position.y = 0;
        };
        this.setPerspective = function () {
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

        this.initCamera = function (game) {
            var level = game.getLevel();
            var camera = this.camera;
            camera.position = {
                x: 0, y: 0
            };
            camera.traceWindow = {
                start: ~~this.drawContext.canvas.width * 0.2,
                end: ~~level.map.width - this.drawContext.canvas.width
            };
            camera.size = {
                width: this.drawContext.canvas.width,
                heigth: this.drawContext.canvas.height
            };
           
            camera.maxPerspective = level.imageData.background.naturalWidth;
            camera.maxRight = (level.map.width - 2*this.camera.size.width);
            camera.perspectiveRatio = level.imageData.background.naturalWidth / (2*level.map.width);
        };

        this.updateCamera = function (actorObj) {
            var camera = this.camera, aPos = actorObj.instance.position.x;
            camera.position.y = 200 - actorObj.instance.position.y;
            if(aPos>camera.maxRight){           
                return;    
            }
            if (aPos > camera.traceWindow.start &&
                    aPos < camera.traceWindow.end) {
                camera.position.x = -aPos + camera.traceWindow.start;
                camera.perspective.x = ~~camera.position.x * camera.perspectiveRatio;
                
             
            }else{
               
                
            }
            
        };

        this.drawLevel = function (level) {
            var camera = this.camera;
            this.animateTicker += 1;
            this.updateCamera(level.actors[0]);
            this.drawContext.drawImage(level.imageData.background, camera.perspective.x, camera.position.y * 0.05 - 50);
            this.drawLevelWireframe(level);
            var actors = level.actors;
            for (var x in actors) {
                this.drawActor(actors[x].instance);
            }

        };


        this.drawActor = function (actor) {
            if (this.animateTicker % 5 === 0) {
                actor.frame += 1;
            }

            if (actor.animation.frames <= actor.frame) {                
                if (actor.animation.loop === true) {
                    actor.frame = 1;
                } else {
                    actor.frame -= 1;
                }
            }
            this.drawContext.drawImage(actor.sprite,
                    actor.entity.meshData.width * actor.frame,
                    actor.animation.offset,
                    actor.entity.meshData.width,
                    actor.entity.meshData.height,
                    actor.position.x + this.camera.position.x, 
                    actor.position.y + this.camera.position.y,
                    actor.entity.meshData.width*2,
                    actor.entity.meshData.height*2);
            if (actor.activeWeapon.isShooting) {
                this.drawWeapon(actor);
            }
            actor.hit.redraw(this,actor);
        };

        this.drawWeapon = function (actor) {
            actor.activeWeapon.sprite.naturalWidth>0 &&
            this.drawContext.drawImage(actor.activeWeapon.sprite,
                    actor.entity.meshData.width * actor.frame,
                    actor.animation.offset,
                    actor.entity.meshData.width,
                    actor.entity.meshData.height,
                    actor.position.x + this.camera.position.x, 
                    actor.position.y + this.camera.position.y,
                    actor.entity.meshData.width*2,
                    actor.entity.meshData.height*2);

        };

        this.drawPickable = function (pickable) {
            
            this.drawContext.drawImage(pickable.sprite,
                    pickable.width * pickable.frame,
                    0,
                    pickable.width,
                    pickable.height,
                    pickable.position.x + this.camera.position.x, pickable.position.y + this.camera.position.y,
                    pickable.width,
                    pickable.height);
        };

        this.drawAmmo = function (ammo) {
            //don't draw spear ammo
            if(ammo.drawable===false) return;
            var actor = ammo.ownerWeapon.ownerActor;
            this.drawContext.beginPath();
            this.drawContext.strokeStyle = "#00FF00";
            this.drawContext.moveTo(ammo.position.x + this.camera.position.x+30, ammo.position.y + this.camera.position.y+30);
            this.drawContext.lineTo(ammo.position.x + 60 + this.camera.position.x, ammo.position.y + this.camera.position.y+30);
            this.drawContext.stroke();
            this.drawContext.closePath();


            return;
        };
        this.inSight = function (realNumber) {
            if (realNumber >= this.camera.position.x && realNumber <= this.camera.size.width) {
                return true;
            }
            return false;
        };
        this.assambleActor = function (actor) {
        };
        this.drawLevelWireframe = function (level) {
            var brick = level.imageData.levelBrick;
            this.drawContext.beginPath();
            this.drawContext.strokeStyle = "#FF0000";
            for (x in level.map.obstacles) {
                this.drawLevelLine(level.map.obstacles[x],brick);
                
              //  this.drawContext.moveTo((level.map.obstacles[x][0]) + this.camera.position.x, (level.map.obstacles[x][0] * level.map.obstacles[x][2] + level.map.obstacles[x][3]) + this.camera.position.y + 65);
              //  this.drawContext.lineTo((level.map.obstacles[x][1]) + this.camera.position.x, (level.map.obstacles[x][1] * level.map.obstacles[x][2] + level.map.obstacles[x][3]) + this.camera.position.y + 65);
            }
            this.drawContext.stroke();
            this.drawContext.closePath();
        };
        
        this.drawLevelLine = function(element,image){
            var startX = element[0] + this.camera.position.x ,
                startY = (element[0] * element[2] + element[3]) + this.camera.position.y + 65,
                endX = element[1] + this.camera.position.x,
                endY = (element[1] * element[2] + element[3]) + this.camera.position.y + 65,
                incrementVector =  image.naturalWidth*0.6,
                x=startX,
                y=startY;
                while(x<endX-incrementVector){
                  this.drawContext.drawImage(image,x,y - 80);    
                   x = x+incrementVector;
                   y = incrementVector*element[2]+y;
                   
                }
                this.drawContext.drawImage(image,endX-incrementVector,y - 80);    
                
            
        };

    };

    return (ViewPort);

});