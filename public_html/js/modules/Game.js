define(["GameplayContext", "MenuContext"], function(GameplayContext, MenuContext) {

    /**
     * init - load all needed stuff, show preloader etc
     * menu - show menu allow navigation
     * gameplay - allow playing 
     * 
     */

    var Game = function() {
        this.context = {};
        this.contextCollection = [];

        this.init = function() {
            console.log("Initializing game object");
            this.contextCollection = {
                menuContext:new MenuContext(this),
                gameplayContext:new GameplayContext(this)
            };
            this.context = this.contextCollection[0];
        };
        this.getContext = function() {
            return this.context;
        };
        this.setContext = function(context) {
            this.context = this.contextCollection[context];
        };
        
    };
    return (Game);


});