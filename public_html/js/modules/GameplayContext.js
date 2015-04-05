define(function(gameInstance) {

    var GameplayContext = function() {
        this.redraw = function(InputHandler, game, viewport) {
            var level = game.getLevel();
            viewport.drawLevel(level);
            viewport.drawLevelWireframe(level);
        };
        this.update = function(inputHandler, game, viewport) {
            var level = game.getLevel(),actor = level.actors[0].instance;
            if (inputHandler.bufferSize === 0 && !game.physics.inAir(actor) ) {
                actor.velocity.x = 0;
                actor.stand();
            }
            if (inputHandler.isPressed("Pause")) {
                game.setContext("menuContext");
            }

            if (!game.physics.inAir(actor)) {
                this.handleControllsGround(actor, inputHandler, game);
            }
            game.physics.setVisibleMap(viewport);
            for (var x in level.actors){
                game.physics.affectActor(level.actors[x].instance);
                game.physics.inbound(level.actors[x].instance,level);
                if (x!=0){
                    level.actors[x].instance.walk("Right");
                }
            }
            
            
        };

        this.handleControllsGround = function(actor, inputHandler, game) {
            if (inputHandler.isPressed("Left")) {

                if (inputHandler.isPressed("Up")) {
                    actor.jump("Left");
                } else {
                    actor.walk("Left");
                }

            }
            if (inputHandler.isPressed("Right")) {
                actor.walk("Right");
            }
            if (inputHandler.isPressed("Fire")) {
                actor.animation.offset = actor.entity.meshDataOffset.die.y;
                actor.animation.frames = actor.entity.meshData.dieFrames;
            }
            if (inputHandler.isPressed("Up")) {
                actor.jump("Up");
            }

            if (inputHandler.isPressed("Right") && inputHandler.isPressed("Left")) {
                actor.stand();
            }


            if (inputHandler.isPressed("Up") && inputHandler.isPressed("Right")) {
                actor.jump("Right");
            }
             if (inputHandler.isPressed("Up") && inputHandler.isPressed("Left")) {
                actor.jump("Left");
            }

        };

    };
    return(GameplayContext);
});