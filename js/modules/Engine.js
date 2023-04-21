define(["InputHandler", "Game", "Viewport", "config"], function (inputHandler, Game, ViewPort, config) {
    var animationData = {};
    return {
        game: {},
        context: {},
        init: function () {
            inputHandler.init();
            animationData.game = new Game();
            animationData.viewPort = new ViewPort();

            animationData.viewPort.init(config.viewPort);
            animationData.game.init();
            this.mainLoop();
        },
        animationData:{
            viewport:{},
            game:{}    
        },
        mainLoop:function() {
            var timing =[];
            var c=0;
            function step(){
                animationData.game.context.update(inputHandler, animationData.game,animationData.viewPort);
                animationData.game.context.redraw(inputHandler,animationData.game,animationData.viewPort);
                requestAnimationFrame(step);
            }
            step();
        },
    };
});