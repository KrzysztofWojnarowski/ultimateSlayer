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
            perspective: {
                x: -800, y: 0
            }

        };

        this.drawLevel = function(level) {
            //this.drawContext.clearContext();
            this.animateTicker+=1;
            this.setPerspective();
            this.setPosition();
            var perspective = this.getPerspective();
            var position = this.getPosition();
            this.drawContext.drawImage(level.imageData.background, perspective.x, perspective.y);
            this.drawContext.drawImage(level.imageData.foreground, position.x, position.y);
            var actors = level.actors;
            for (var x in actors) {
                this.drawActor(actors[x].instance);
            }
        };

        this.drawActor = function(actor) {
           /* this.drawContext.drawImage(actor.sprite,
            actor.entity.meshDataOffset.walkLeft.x*actor.frame,
            actor.entity.meshDataOffset.walkLeft.y,
            actor.entity.meshData.width,
            actor.entity.meshData.heigth,
            0,0,
            65,65);
            */
           
            this.drawContext.drawImage(actor.sprite,
            actor.entity.meshData.width*actor.frame,
            actor.animation.offset,
            actor.entity.meshData.width,
            actor.entity.meshData.height,
            actor.position.x,actor.position.y,
            actor.entity.meshData.width,
            actor.entity.meshData.height);
            
            
            
            //var id = this.bufferContext.getImageData(actor.frame*actor.entity.meshData.width,332 , actor.entity.meshData.width, actor.entity.meshData.height);
            //this.drawContext.putImageData(id, actor.position.x, actor.position.y);
            if(this.animateTicker%5===0){
                actor.frame += 1;    
            }
            if (actor.animation.frames <= actor.frame) {
                actor.frame = 1;
            }

        };
        this.assambleActor = function(actor) {
        };


    };



    return (ViewPort);


});