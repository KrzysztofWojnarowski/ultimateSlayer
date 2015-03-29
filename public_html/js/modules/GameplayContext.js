define(function(gameInstance) {

    var GameplayContext = function() {
        this.redraw = function(InputHandler, game, viewport) {
            var level = game.getLevel();
            viewport.drawLevel(level);
        };
        this.update = function(inputHandler, game) {
            var actor = game.getLevel().actors[0].instance;
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

            game.physics.affectActor(actor);
            
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