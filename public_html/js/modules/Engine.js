define(["InputHandler","Game"], function(inputHandler,Game) {
    return {
        
        game: {},
        context:{},
        init: function() {
            inputHandler.init();
            var game = new Game();
            
            game.init();
            
            this.mainLoop(game);
        },
        mainLoop: function(game) {
            var mainLoop = window.setInterval(this.mainLoopActions,40,game);
        },
        mainLoopActions: function(game){
            
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