define(["InputHandler","Game"], function(inputHandler,game) {
    return {
        init: function() {
            inputHandler.init();
            this.mainLoop();
        },
        mainLoop: function() {
            var mainLoop = window.setInterval(this.checkKeyState, 40);
        },
        mainLoopaActions: function(){
            this.dispatchAction(); 
            this.updateGame();
            this.redraw();
            
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