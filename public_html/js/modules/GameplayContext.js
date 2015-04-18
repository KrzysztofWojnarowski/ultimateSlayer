define(function (gameInstance) {

    var GameplayContext = function () {


        this.redraw = function (InputHandler, game, viewport) {
            var level = game.getLevel();
            viewport.drawLevel(level);
            viewport.drawLevelWireframe(level);
        };
        this.update = function (inputHandler, game, viewport) {

            if (inputHandler.isPressed("Pause")) {
                game.setContext("menuContext");
                return true;
            }
            var level = game.getLevel();
            game.physics.setVisibleMap(viewport);
            this.updateActorsState(game, level, inputHandler);


        };

        this.updateActorsState = function (game, level, inputHandler) {
            for (var x in level.actors) {
                level.actors[x].instance.activeWeapon.update();
                if (x == 0) {
                    var actor = level.actors[0].instance;
                    if (inputHandler.bufferSize === 0 && !game.physics.inAir(actor)&& !actor.activeWeapon.isShooting) {
                        actor.velocity.x = 0;
                        actor.stand();
                    }
                    if (!game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        this.handleControllsGround(actor, inputHandler, game);
                    }
                } else {
                    level.actors[x].instance.walk("Right");
                }
                game.physics.affectActor(level.actors[x].instance);
                game.physics.inbound(level.actors[x].instance, level);
            }
        }

        this.handleControllsGround = function (actor, inputHandler, game) {
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

            if (inputHandler.isPressed("Right") && inputHandler.isPressed("Left")) {
                actor.stand();
            }
            if (inputHandler.isPressed("Up")) {
                if (inputHandler.isPressed("Left")) {
                    actor.jump("Left");
                } else if (inputHandler.isPressed("Right")) {
                    actor.jump("Right");
                } else {
                    actor.velocity.x = 0;
                    actor.jump("Up");
                }
            }

        };
    };
    return(GameplayContext);
});