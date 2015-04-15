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
            this.updateActorsState(game,level);
            
            
        };
        
        this.updateActorsState = function(game,level){
            for (var x in level.actors){
                game.physics.affectActor(level.actors[x].instance);
                
                level.actors[x].instance.activeWeapon.update();
                if (x>0){
                    level.actors[x].instance.walk("Right");
                }
                game.physics.inbound(level.actors[x].instance,level);
            }
        }

        this.handleControllsGround = function(actor, inputHandler, game) {
            if (inputHandler.isPressed("Left")) {

                if (inputHandler.isPressed("Up")) {
                    actor.jump("Left");
                } else {
                    actor.walk("Left");
                }
            }
            if (inputHandler.isPressed("Fire") && inputHandler.isPressed("Right")) {
                actor.stand();
                actor.Shoot("Right");
                return;
            }
            if (inputHandler.isPressed("Fire") && inputHandler.isPressed("Left")) {
                actor.stand();
                actor.Shoot("Left");
                return;
            }
            
            if (inputHandler.isPressed("Right")) {
                actor.walk("Right");
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