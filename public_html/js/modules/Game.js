define(["GameplayContext", "MenuContext", "LoadingContext"], function(GameplayContext, MenuContext, LoadingContext) {

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
        

        this.init = function() {
            console.log("Initializing game object");
            this.contextCollection = {
                loadingContext: new LoadingContext(this),
                menuContext: new MenuContext(this),
                gameplayContext: new GameplayContext(this)
            };

            this.context = this.contextCollection.loadingContext;
        };
        this.getContext = function() {
            return this.context;
        };
        this.setContext = function(context) {
            console.log(context,this.contextCollection[context]);
            this.context = this.contextCollection[context];
        };
        this.getLevel = function(){
            return this.currentLevel;
        };

    };
    return (Game);


});