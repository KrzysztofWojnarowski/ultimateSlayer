define(["InputHandler", "Game", "Viewport", "config"], function(inputHandler, Game, ViewPort, config) {
    return {
        game: {},
        context: {},
        init: function() {
            inputHandler.init();
            var game = new Game();
            var viewPort = new ViewPort();

            viewPort.init(config.viewPort);
            game.init();
            this.mainLoop(game, viewPort);
        },
        mainLoop: function(game, viewPort) {
           
            var mainLoop = window.setInterval(this.mainLoopActions, config.game.dt, game, viewPort);
        },
        mainLoopActions: function(game, viewPort) {
            var k= performance.now();
            game.context.update(inputHandler, game,viewPort);
            game.context.redraw(inputHandler,game,viewPort);
            var s = performance.now();
            //console.log("Timing:",s-k);

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
        dispatchAction: function() {
            //1 check keysState
            // perfor
        },
        updateGame: function() {
        }


    };
});