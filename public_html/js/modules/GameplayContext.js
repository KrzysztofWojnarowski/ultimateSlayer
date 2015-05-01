define(function (gameInstance) {

    var GameplayContext = function () {


        this.redraw = function (InputHandler, game, viewport) {
            var level = game.getLevel(), x;
            viewport.drawLevel(level);
            viewport.drawLevelWireframe(level);

            for (x in game.ammoArray) {
                viewport.drawAmmo(game.ammoArray[x]);
            }
        };
        this.update = function (inputHandler, game, viewport) {

            if (inputHandler.isPressed("Pause")) {
                game.setContext("menuContext");
                return true;
            }
            var level = game.getLevel();
            game.physics.setVisibleMap(viewport);
            this.handleAmmo(game);

            this.handleAmmoEffect(level.actors, game.ammoArray, game.physics);
            this.updateActorsState(game, level, inputHandler);


        };

        this.updateActorsState = function (game, level, inputHandler) {
            for (var x in level.actors) {
                level.actors[x].instance.activeWeapon.update();
                if (x == 0) {
                    var actor = level.actors[0].instance;
                    if (inputHandler.bufferSize === 0 && !game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        actor.velocity.x = 0;
                        actor.stand();
                    }
                    if (!game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        this.handleControllsGround(actor, inputHandler, game);
                    }
                } else {
                    var dir = x % 2 == 0 ? "Left" : "Right";
                    game.AI.process(game,level.actors[x].instance,level.actors[0].instance);
                    
                }
                
                game.physics.affectActor(level.actors[x].instance);
                game.physics.inbound(level.actors[x].instance, level);
            }
        };



        this.handleControllsGround = function (actor, inputHandler, game) {
            if (inputHandler.isPressed("Left")) {

                if (inputHandler.isPressed("Up")) {
                    actor.jump("Left");
                } else {
                    actor.walk("Left");
                }
            }
            
            if (inputHandler.isPressed("Fire") ) {
                actor.stand();
                actor.Shoot();
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

        this.handleAmmo = function (game) {
            var x,
                    ammoArray = game.ammoArray;
            for (x in ammoArray) {
                ammoArray[x].update();

            }
            ;
        };

        this.handleAmmoEffect = function (actors, ammo, physics) {
            var x, y;
            
            for (x in actors) {
                for (y in ammo) {
                    if (physics.ammoCollided(actors[x], ammo[y])) {
                        actors[x].instance.onCollideAmmo(ammo[y]);
                        
                        ammo[y].onCollideActor();
                        if (!actors[x].instance.isAlive()) {
                            
                            actors[x].instance.die();
                        }
                    }

                }
            }
        };


    };
    return(GameplayContext);
});