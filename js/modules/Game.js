define(["GameplayContext", "MenuContext", "LoadingContext", "Physics", "AI", "models/goodies/Blood", "models/goodies/HUD"], function (GameplayContext, MenuContext, LoadingContext, Physics, AI, Blood, HUD) {

    /**
     * init - load all needed stuff, show preloader etc
     * menu - show menu allow navigation
     * gameplay - allow playing 
     * 
     */

    var Game = function () {
        this.context = {};
        this.contextCollection = [];
        this.currentLevel = {};
        this.actors = [];
        this.physics = {};
        this.weapons = {};
        this.weaponData = {};
        this.ammoData = {};
        this.ammo = [];
        this.ammoArray = [];
        this.AI = AI;
        this.difficultyFactor = 0.1;
        this.Blood = Blood;
        this.HUD = HUD;
        this.possession = {
            tick: 0,
            counter: 5,
            reloading: false
        };
        this.pickables =[];

        this.init = function () {
            this.contextCollection = {
                loadingContext: new LoadingContext(this),
                menuContext: new MenuContext(this),
                gameplayContext: new GameplayContext(this)
            };

            this.context = this.contextCollection.loadingContext;
            this.physics = new Physics();

        };
        this.getContext = function () {
            return this.context;
        };
        this.setContext = function (context) {
            this.context = this.contextCollection[context];
        };
        this.getLevel = function () {
            return this.currentLevel;
        };

        this.updatePossess = function () {
            if (this.possession.tick > 1000) {
                this.possession.tick = 0;
                this.possession.reloading = false;
            }
            if (this.possession.reloading === true) {
                this.possession.tick++;
            }
            return;
        };


    };
    return (Game);


});