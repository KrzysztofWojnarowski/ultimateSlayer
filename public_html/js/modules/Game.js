define(["GameplayContext", "MenuContext", "LoadingContext","Physics"], function(GameplayContext, MenuContext, LoadingContext,Physics) {

    /**
     * init - load all needed stuff, show preloader etc
     * menu - show menu allow navigation
     * gameplay - allow playing 
     * 
     */

    var Game = function() {
        this.context = {};
        this.contextCollection = [];
        this.currentLevel ={};
        this.actors =[];
        this.physics = {};
        this.weapons = [];
        
        

        this.init = function() {
            console.log("Initializing game object");
            this.contextCollection = {
                loadingContext: new LoadingContext(this),
                menuContext: new MenuContext(this),
                gameplayContext: new GameplayContext(this)
            };

            this.context = this.contextCollection.loadingContext;
            this.physics = new Physics();
            
        };
        this.getContext = function() {
            return this.context;
        };
        this.setContext = function(context) {
            this.context = this.contextCollection[context];
        };
        this.getLevel = function(){
            return this.currentLevel;
        };
        
        
    };
    return (Game);


});