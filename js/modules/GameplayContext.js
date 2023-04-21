define(function (gameInstance) {

    var GameplayContext = function () {
        this.tick = 0;
        this.redrawed=0;
        this.fpsTick=0;
        this.fps=0;
        this.originalScale ={x:0,y:0};
        
        this.performanceTest = function(){
             if (performance.now() - this.redrawed<30){
               return;
            }
            if(performance.now() - this.fpsTick>1000){
                console.log(1000*this.fps/(performance.now()-this.fpsTick));
                this.fps=0;
                this.fpsTick = performance.now();
            }
            this.fps++;
            this.redrawed = performance.now();
        };
        this.redraw = function (InputHandler, game, viewport) {
            this.performanceTest();
            var level = game.getLevel(), x;
            viewport.drawLevel(level, this.tick);
            for (x in game.ammoArray) {
                viewport.drawAmmo(game.ammoArray[x]);
            }
            for (x in game.pickables){
                viewport.drawPickable(game.pickables[x]);
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
            this.updateActorsState(game, level, inputHandler,viewport);
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
        };

        this.updateActorsState = function (game, level, inputHandler,viewport) {
            for (var x in level.actors) {
                if (!level.actors[x].instance.isAlive()) {
                    game.physics.affectActor(level.actors[x].instance,viewport);
                    continue;
                }
                level.actors[x].instance.activeWeapon.update();
                if (x == 0) {
                    
                    var actor = level.actors[0].instance;
                    actor.mouseEvent = inputHandler.mouseEvent;
                    game.updatePossess();
                    if (inputHandler.bufferSize === 0 && !game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        actor.velocity.x = 0;
                        actor.stand();
                    }
                    this.updatePickables(actor,game,game.physics);
                    if (!game.physics.inAir(actor) && !actor.activeWeapon.isShooting) {
                        this.handleControllsGround(actor, inputHandler, game);
                    }else if (game.physics.inAir(actor)){
                        this.handleAirControl(actor, inputHandler, game);
                    }
                    
                    game.HUD.update(actor);
                } else {
                    game.AI.process(game, level.actors[x].instance, level.actors[0].instance);
                    level.actors[x].instance.hit.update();
                }
                game.physics.affectActor(level.actors[x].instance,viewport);
            }
        };



        this.handleControllsGround = function (actor, inputHandler, game) {
            
            if(inputHandler.isPressed("1")){
                actor.setActiveWeapon(actor.weapons["Bow"]);
                return;
            }
            
            if(inputHandler.isPressed("2")){
                actor.setActiveWeapon(actor.weapons["Spear"]);
                return;
            }
            
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
        
        this.updatePickables = function(actor,game,physics){
            //var aPos = actor.position,x;
            for(x in game.pickables){
                game.pickables[x].update();
                 if (physics.collided(actor,game.pickables[x])) {
                     game.pickables[x].onCollideActor(actor);
                     delete game.pickables[x];
                 }
            }
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