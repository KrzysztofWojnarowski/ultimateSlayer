define(["LevelController"], function(levelController) {

    var LoadingContext = function(gameInstance) {

        //this.gameInstance = gameInstance;
        this.loadingStarted = false;
        this.loadingEnded = false;
        this.imageData = {
            foreground: {},
            background: {}
        };
        this.update = function(inputHandler, game) {
            if (typeof game.currentLevel.index === "undefined") {
                console.log("bindingLevel...");
                game.currentLevel = levelController.getLevel(0);
            } else if (this.loadingStarted === false && this.loadingEnded === false) {
                this.loadingStarted = true;
                
                this.imageData.background = new Image();
                this.imageData.foreground = new Image();
                this.imageData.background.src = game.currentLevel.backgroundImage;
                this.imageData.foreground.src = game.currentLevel.foregroundImage;
                game.currentLevel.imageData = this.imageData;
                console.log("Background Assigned");
            } else if (this.loadingEnded === false && this.loadingStarted === true) {
                console.log("Still loading");
                if (this.isDataLoaded(this.imageData.background) &&
                        this.isDataLoaded(this.imageData.foreground)) {
                    this.loadingEnded = true;
                    this.loadingStarted = false;
                }
            } else if (this.loadingEnded === true && this.loadingStarted === false) {
                console.log("Assets loaded");
                game.setContext("gameplayContext");
            }
        };

        this.isDataLoaded = function(imageElement) {
            if (imageElement.naturalWidth === 0 && imageElement.naturalHeight === 0) {
                return false;
            }
            return true;
        };

        this.redraw = function() {
        };



    };

    return (LoadingContext);
});
