define(function(gameInstance) {

    var GameplayContext = function() {
        this.redraw = function(InputHandler, game, viewport) {
            var level = game.getLevel();
            viewport.drawLevel(level);
        };
        this.update = function(inputHandler, game) {
            var actor = game.getLevel().actors[0].instance;
            if (inputHandler.bufferSize === 0 && !actor.isJumping()) {
                actor.velocity.x = 0;
                actor.stand();
            }
            
            console.log(inputHandler.bufferSize );
            if (inputHandler.isPressed("Pause")) {
                game.setContext("menuContext");
            }

            if (inputHandler.isPressed("Left")) {
                actor.walk("Left");
            }
            if (inputHandler.isPressed("Right")) {
                actor.walk("Right");
            }
            if (inputHandler.isPressed("Fire")) {
                actor.animation.offset = actor.entity.meshDataOffset.die.y;
                actor.animation.frames = actor.entity.meshData.dieFrames;
            }
            if (inputHandler.isPressed("Up")) {
                actor.jump();
            }





            game.physics.affectActor(actor);
        };
    };
    return(GameplayContext);
});