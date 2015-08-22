define(["LevelController", 
    "Actor", 
    "models/weapon/WeaponList",
    "Weapon",
    "models/weapon/AmmoList",
    "Ammo",
    "Pickable",
    "models/Pickables/PickableSet",
    "models/EquipmentFactory"], function (
        levelController,
        Actor,
        WeaponList,
        Weapon,
        AmmoList,
        Ammo,
        Pickable,
        PickableSet,
        EquipmentFactory) {

    var LoadingContext = function (gameInstance) {

        //this.gameInstance = gameInstance;
        this.loadingStarted = false;
        this.loadingEnded = false;
        this.assigningActors = false;
        this.assigningWeapons = false;
        this.models = [];
        this.weaponData = {};
        this.imageData = {
            background: {},
            bl:false,
            fl:false
        };

        this.assignStage = function (game,viewport) {
            var imageData = this.imageData;
            imageData.background = new Image();
            imageData.levelBrick = new Image();
            imageData.background.src = game.currentLevel.backgroundImage;
            imageData.levelBrick.src = game.currentLevel.levelBrick;
            imageData.levelBrick.onload = function(e){
                imageData.fl=true;
            };
            imageData.background.onload = function(){
                imageData.bl=true;
            };
            game.currentLevel.imageData = this.imageData;
          
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
                    actor.ownerGame = game;
                    level.actors[x].instance = actor;
                    
                }
            });

        };

        this.assignWeapons = function (game) {
            var weaponList = WeaponList.list, c = 0;
            for (c in weaponList) {
                weaponList[c] = "models/weapon/" + weaponList[c];
            }
            require(weaponList, function () {
                var x = 0, weapon;
                var factory = new EquipmentFactory();
                for (x in arguments) {
                    var weapon = factory.build(Weapon,arguments[x]);
                    game.weapons[arguments[x].type]= weapon;
                    game.weaponData[arguments[x].type] = arguments[x];
                }
            });
            
        };
        
        this.assignAmmo = function (game) {
            var ammoList = AmmoList.list, c = 0;
            for (c in ammoList) {
                ammoList[c] = "models/weapon/" + ammoList[c];
            }
            require(ammoList, function () {
                var x = 0, ammo;
                var factory = new EquipmentFactory();
                for (x in arguments) {
                    
                    game.ammo[arguments[x].type] = factory.build(Ammo,arguments[x]);
                    game.ammoData[arguments[x].type] = arguments[x];
                }
            });
        };
        
        
        
        this.update = function (inputHandler, game, viewport) {
            game.Blood.load();
            
            if (typeof game.currentLevel.index !== "number") {
                game.currentLevel = levelController.getLevel(0);
                
            } else if (this.loadingStarted === false && this.loadingEnded === false) {
                
                this.loadingStarted = true;
                this.assignStage(game,viewport);
                
                if (this.assigningActors === false) {
                    this.assignActors(game);
                    this.assigningActors = true;
                }
                if (this.assigningWeapons === false) {
                    this.assignAmmo(game);
                    this.assignWeapons(game);
                    this.loadPickables(game);
                    this.assigningWeapons = true;
                }
            } else if (this.loadingEnded === false && this.loadingStarted === true) {
                
                
                if (this.imageData.bl === true && this.imageData.fl === true &&
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
                document.getElementById("preloader").style.display="none";
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
            
            var x, c = 0,d=0;
            for ( x in weaponList) {
                d++;
                if (this.isDataLoaded(weaponList[x].sprite)) {
                    c++;
                }
            }
            
            return c === d?true:false;
        };

        this.setStage = function () {

        };

        this.redraw = function () {
            
        };

        this.assembleActors = function(game){
            var x = 0, y= 0;
            var factory = new EquipmentFactory();
            for (x=0;x<game.currentLevel.actors.length;x++){
                var actor = game.currentLevel.actors[x].instance;
                for (y =0;y<actor.entity.weapons.length;y++){
                    var weaponType = actor.entity.weapons[y],
                    weapon = factory.build(Weapon,game.weaponData[weaponType]);
                    var ammo = factory.build(Ammo,game.ammoData[weapon.ammo]);
                    ammo.setSurroundingContext(factory,game.ammoData[weapon.ammo],game,weapon);
                    weapon.ammoModel = ammo;
                    actor.weapons[weaponType] = weapon;
                    weapon.ownerActor = actor;
                    actor.activeWeapon = weapon;
                    
                }
                
            }
        };
        this.loadPickables = function(game){
            var k,
                    models = [],
                    pickables = game.currentLevel.pickables,
                    factory = new EquipmentFactory(),
                    levelPickables = game.currentLevel.pickables;
                    
            
            for (k in levelPickables){
                var pickableData = levelPickables[k];
                var pickable  = factory.build(Pickable, PickableSet[pickableData.type]);
                pickable.position.x = pickableData.position.x;
                pickable.position.y = pickableData.position.y;
                game.pickables.push(pickable);
            };
            return;
            
            
            require(models, function () {
                for (k in game.currentLevel.pickables) {
                    
                    var pickableData = arguments[game.currentLevel.pickables[k].type];
                    pickableData.position.x = game.currentLevel.pickables[k].position.x;
                    pickableData.position.y = game.currentLevel.pickables[k].position.y;
                    var pickable = factory.build(Pickable, pickableData);
                    game.pickables.push(pickable);
                    
                }
            });
            
            
            
        };
        
        


    };

    return (LoadingContext);
});
