define(["LevelController", "Actor"], function(levelController, Actor) {

    var LoadingContext = function(gameInstance) {

        //this.gameInstance = gameInstance;
        this.loadingStarted = false;
        this.loadingEnded = false;
        this.imageData = {
            foreground: {},
            background: {}
        };

        this.assignStage = function(game) {
            this.imageData.background = new Image();
            this.imageData.foreground = new Image();
            this.imageData.background.src = game.currentLevel.backgroundImage;
            this.imageData.foreground.src = game.currentLevel.foregroundImage;
            game.currentLevel.imageData = this.imageData;
            console.log("Background Assigned");
        };

        this.assignActors = function(game) {
            var level = game.getLevel();
            for (var x in level.actors) {
                var actor = new Actor();
                require(["models/" + level.actors[x].type],function(entity){
                    actor.loadEntity(entity);
                });
                level.actors[x].instance = actor;
            }
        };
        this.update = function(inputHandler, game,viewport) {
            if (typeof game.currentLevel.index === "undefined") {
                console.log("bindingLevel...");
                game.currentLevel = levelController.getLevel(0);
            } else if (this.loadingStarted === false && this.loadingEnded === false) {
                this.loadingStarted = true;
                this.assignStage(game);
                this.assignActors(game);
            } else if (this.loadingEnded === false && this.loadingStarted === true) {
                console.log("Still loading");
                if (this.isDataLoaded(this.imageData.background) &&
                        this.isDataLoaded(this.imageData.foreground) &&
                        this.areActorsLoaded(game.currentLevel.actors)
                        ) {
                    console.log("Actors loaded");
                    this.initActorsAnimations(game,viewport);
                    this.loadingEnded = true;
                    this.loadingStarted = false;
                }
            } else if (this.loadingEnded === true && this.loadingStarted === false) {
                console.log("Assets loaded");
                game.setContext("gameplayContext");
            }
        };

        this.isDataLoaded = function(imageElement) {
            if (imageElement.naturalWidth === 0) {
                return false;
            }
            return true;
        };

        this.areActorsLoaded = function(actorsList) {
            var x = 0;
            for (x in actorsList) {
                if (typeof actorsList[x].instance.sprite !=="undefined" && actorsList[x].instance.sprite.naturalWidth !== 0) {
                    return true;
                }
            }
            return false;
        };
        
        this.setStage = function(){
            
        };

        this.redraw = function() {
        };
        
        this.initActorsAnimations = function(game,viewport){
            var level = game.getLevel();
            for (var x in level.actors){
                var actor = level.actors[x];
                actor.instance.initAnimations(game,viewport);
            }
        };



    };

    return (LoadingContext);
});
