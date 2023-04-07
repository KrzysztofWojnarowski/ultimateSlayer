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
        /*mainLoopActions: function() {
            var k= performance.now();
            animationData.game.context.update(inputHandler, animationData.game,animationData.viewPort);
            animationData.game.context.redraw(inputHandler,animationData.game,animationData.viewPort);
            var s = performance.now();
            //console.log("Timing:",s-k);
            requestAnimationFrame(this.mainLoop);
        },
        updateActors: function()
        {
        },
        updateArena: function () {
        },
        checkKeyState: function () {

        },
        redraw: function () {
        },
        dispatchAction: function () {
            //1 check keysState
            // perfor
        },
        updateGame: function () {
        }

*/
    };
});