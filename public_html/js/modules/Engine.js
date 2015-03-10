define(["InputHandler","Game","Viewport","config"], function(inputHandler,Game,ViewPort,config) {
    return {
        
        game: {},
        context:{},
        init: function() {
            inputHandler.init();
            var game = new Game();
            var viewPort = new ViewPort();
            
            viewPort.init(config.viewPort);
            game.init();
           this.mainLoop(game,viewPort);
        },
        mainLoop: function(game,viewPort) {
            var mainLoop = window.setInterval(this.mainLoopActions,40,game,viewPort);
        },
        mainLoopActions: function(game,viewPort){
            
            this.context = game.getContext();
            this.context.update(inputHandler,game);
            this.context.redraw(inputHandler);
            
        },
        updateActors: function() 
        {
        },
        updateArena: function() {
        },
        checkKeyState: function() {
            
        },
        redraw: function() {
        },
        dispatchAction:function(){
           //1 check keysState
           // perfor
        },
        updateGame:function(){}


    };
});