define(function (gameInstance) {

    var GameplayContext = function () {
        this.tick = 0;
        
        this.redraw = function (InputHandler, game, viewport) {
            var level = game.getLevel(), x;
            viewport.drawLevel(level, this.tick);
            viewport.drawLevelWireframe(level);
            for (x in game.ammoArray) {
                viewport.drawAmmo(game.ammoArray[x]);
            }
            game.Blood.redraw(viewport,game.currentLevel.actors[0].instance);
            game.HUD.redraw(viewport);
        };
        this.update = function (inputHandler, game, viewport) {
            var level = game.getLevel();

            if (inputHandler.isPressed("Pause")) {
                game.setContext("menuContext");
                return true;
            }
            this.handleAmmo(game);
            this.handleAmmoEffect(level.actors, game.ammoArray, game.physics);
            this.updateActorsState(game, level, inputHandler);
            game.Blood.update();
            
        };
        
        this.handleAirControl = function(actor, inputHandler, game){
            
            if (inputHandler.isPressed("Left") && inputHandler.isPressed("Right")) {
                return;
            }
            if (inputHandler.isPressed("Left")) {
                actor.flyLeft();
                return;
            }
            if (inputHandler.isPressed("Right")) {
                actor.flyRight();
                return;
            }
        }

        this.updateActorsState = function (game, level, inputHandler) {
            for (var x in level.actors) {
                if (!level.actors[x].instance.isAlive()) {
                    game.physics.affectActor(level.actors[x].instance);
                    continue;
                }
                level.actors[x].instance.activeWeapon.update();
                if (x == 0) {
                    
                    var actor = level.actors[0].instance;
                    game.updatePossess();
                    if (inputHandler.bufferSize === 0 && !game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        actor.velocity.x = 0;
                        actor.stand();
                    }
                    
                    if (!game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        this.handleControllsGround(actor, inputHandler, game);
                    }else if (game.physics.inAir(actor)){
                        this.handleAirControl(actor, inputHandler, game);
                    }
                    
                    game.HUD.update(actor);
                } else {
                    game.AI.process(game, level.actors[x].instance, level.actors[0].instance);
                }
                game.physics.affectActor(level.actors[x].instance);
            }
        };



        this.handleControllsGround = function (actor, inputHandler, game) {
            if (inputHandler.isPressed("Posess")) {
                actor.posess();
                return;
            }
            if (inputHandler.isPressed("Up")) {
                actor.action = "stand";
                if (inputHandler.isPressed("Left")) {
                    actor.jump("Left");
                    return;
                }
                if (inputHandler.isPressed("Right")) {
                    actor.jump("Right");
                    return;
                }
                actor.velocity.x = 0;
                actor.jump("Up");
            }
            if (inputHandler.isPressed("Fire")) {
                actor.Shoot();
                return;
            }
            if (inputHandler.isPressed("Right") && inputHandler.isPressed("Left")) {
                actor.stand();
                return;
            }
            if (inputHandler.isPressed("Right")) {
                actor.walk("Right");
            }
            if (inputHandler.isPressed("Left")) {
                actor.walk("Left");
            }
        };

        this.handleAmmo = function (game) {
            var x,
                    ammoArray = game.ammoArray;
            for (x in ammoArray) {
                ammoArray[x].update();

            };
        };

        this.handleAmmoEffect = function (actors, ammo, physics) {
            var x, y;

            for (x in actors) {
                if (!actors[x].instance.isAlive()) {
                    continue;
                }
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