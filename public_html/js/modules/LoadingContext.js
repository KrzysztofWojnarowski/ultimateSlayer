define(["LevelController", "Actor", "models/weapon/WeaponList","Weapon"], function (levelController, Actor, WeaponList,Weapon) {

    var LoadingContext = function (gameInstance) {

        //this.gameInstance = gameInstance;
        this.loadingStarted = false;
        this.loadingEnded = false;
        this.assigningActors = false;
        this.assigningWeapons = false;
        this.models = [];
        this.imageData = {
            foreground: {},
            background: {}
        };

        this.assignStage = function (game) {
            this.imageData.background = new Image();
            this.imageData.foreground = new Image();
            this.imageData.background.src = game.currentLevel.backgroundImage;
            this.imageData.foreground.src = game.currentLevel.foregroundImage;
            game.currentLevel.imageData = this.imageData;
            console.log("Background Assigned");
        };

        this.assignActors = function (game) {
            var level = game.getLevel(), x = 0;
            this.assigningActors = true;
            var modelsModules = [];
            for (var x in level.actors) {
                modelsModules.push("models/" + level.actors[x].type);
            }
            require(modelsModules, function () {
                var x = 0;
                for (x in arguments) {
                    var actor = new Actor();
                    actor.loadEntity(arguments[x]);
                    actor.position = level.actors[x].position;
                    level.actors[x].instance = actor;
                }
            });

        };

        this.assignWeapons = function (game) {
            console.log("Assigning weapons");
            var weaponList = WeaponList.list, c = 0;
            for (c in weaponList) {
                weaponList[c] = "models/weapon/" + weaponList[c];
            }
            require(weaponList, function () {
                var x = 0, weapon;
                for (x in arguments) {
                    weapon = arguments[x];
                    weapon.sprite.src = weapon.meshFile;
                    weapon.prototype = Weapon;
                    game.weapons.push(weapon);
                }
            });
        };




        this.update = function (inputHandler, game, viewport) {
            if (typeof game.currentLevel.index === "undefined") {
                console.log("bindingLevel...");
                game.currentLevel = levelController.getLevel(0);
            } else if (this.loadingStarted === false && this.loadingEnded === false) {
                console.log("Loading started");
                this.loadingStarted = true;
                this.assignStage(game);
                if (this.assigningActors === false) {
                    this.assignActors(game);
                    this.assigningActors = true;
                }
                if (this.assigningWeapons === false) {
                    this.assignWeapons(game);
                    this.assigningWeapons = true;
                }
            } else if (this.loadingEnded === false && this.loadingStarted === true) {
                
                
                if (this.isDataLoaded(this.imageData.background) &&
                        this.isDataLoaded(this.imageData.foreground) &&
                        this.areActorsLoaded(game.currentLevel.actors) &&
                        this.areWeaponsLoaded(game.weapons)
                        ) {
                    this.assembleActors(game);
                    this.loadingEnded = true;
                    this.loadingStarted = false;
                }

            } else if (this.loadingEnded === true && this.loadingStarted === false) {
                viewport.initCamera(game);
                game.physics.init(game.getLevel().map);
                game.setContext("gameplayContext");
            }
        };

        this.isDataLoaded = function (imageElement) {
            if (imageElement.naturalWidth === 0) {
                return false;
            }
            return true;
        };

        this.areActorsLoaded = function (actorsList) {
            var x = 0, c = 0;

            for (x in actorsList) {
                if (typeof actorsList[x].instance.sprite !== "undefined" && actorsList[x].instance.sprite.naturalWidth !== 0) {
                    c++;
                }
            }
            if (c === actorsList.length) {
                return true;
            } else {
                return false;
            }
        };

        this.areWeaponsLoaded = function (weaponList) {
            var x = 0, c = 0;
            for (x = 0; x<weaponList.length;x++) {
                
                if (this.isDataLoaded(weaponList[x].sprite)) {
                    c++;
                }
            }
            return c === weaponList.length?true:false;
        };

        this.setStage = function () {

        };

        this.redraw = function () {
        };

        this.assembleActors = function(game){
            var x = 0, y= 0;
            for (x=0;x<game.currentLevel.actors.length;x++){
                
                for (y =0;y<game.currentLevel.actors[x].instance.entity.weapons.length;y++){
                    game.currentLevel.actors[x].instance.addWeapon(game.currentLevel.actors[x].instance.entity.weapons[y],Weapon,game);
                }
                
            }
        };


    };

    return (LoadingContext);
});
