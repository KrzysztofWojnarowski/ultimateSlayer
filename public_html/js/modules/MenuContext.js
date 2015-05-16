define(["GameText"], function (textAsset) {

    var MenuContext = function () {
        this.page = textAsset.menu;
        this.footer = textAsset.footer;
        this.title = textAsset.title;
        this.pageName = "menu";
        this.gameOverLogo = new Image();
        this.gameOverLogo.src = "assets/game_over.png";
        this.endingType="";

        this.redrawEndGame = function (inputHandler, game, viewport) {
            if (this.endingType==="YouWon"){
                this.page =  textAsset.youWon;
            }else if(this.endingType==="YouLoose"){
                this.page =  textAsset.youLoose;
            }
            var vp = viewport.drawContext;
            viewport.drawContext.drawImage(this.gameOverLogo, 00, -100);
            vp.beginPath();
            vp.font = "13px Verdana";
            vp.fillStyle = '#dd0000';
            for (var x in this.page) {
                vp.fillText(this.page[x], 750, 490 + 20 * x);
            }
            vp.closePath();
            vp.stroke();
            vp.fillStyle = '#111111';
        };

        this.redraw = function (InputHandler, game, viewport) {
            if (this.pageName==="endGame"){
                this.redrawEndGame(InputHandler, game, viewport);
                return;
            }
            
            var vp = viewport.drawContext;
            vp.beginPath();
            vp.fillStyle = '#111111';
            vp.fillRect(0, 0, 1400, 600);
            vp.font = "13px Verdana";
            vp.fillStyle = '#dd0000';
            vp.fillText(this.title, 20, 100 + 40 * x);
            for (var x in this.page) {
                vp.fillText(this.page[x], 20, 100 + 40 * x);
            }
            

            vp.closePath();
            vp.stroke();
            vp.fillStyle = '#111111';
        };

        this.update = function (inputHandler, game) {
            
            switch (this.pageName) {
                case "menu":
                    this.page = textAsset.menu;
                    
                    this.menuPage(inputHandler, game);
                    break;
                case "history":
                    this.history(inputHandler, game);
                    this.page = textAsset.history;
                    break;
                case "controls":
                    this.controls(inputHandler, game);
                    this.page = textAsset.controls;
                    break;
                case "endGame":
                    this.gameEnd(inputHandler, game);
                    
                    break;
                    defauult: return;
                    
            }
        };

        this.gameEnd = function(inputHandler, game){
            
             if (inputHandler.isPressed("Esc")) {
                this.pageName = "menu";
            }
        };

        this.menuPage = function (inputHandler, game) {
            if (inputHandler.isPressed("1")) {
                game.setContext("gameplayContext");
            }
            if (inputHandler.isPressed("2")) {

                this.pageName = "history";
            }
            if (inputHandler.isPressed("3")) {
                this.pageName = "controls";
            }
            
            if (inputHandler.isPressed("Fire")) {
               window.location.reload();
            }



        };
        this.history = function (inputHandler, game) {
            if (inputHandler.isPressed("Esc")) {
                this.pageName = "menu";
            }
        };
        this.controls = function (inputHandler, game) {

            if (inputHandler.isPressed("Esc")) {
                this.pageName = "menu";
            }


        };

    };

    return(MenuContext);


});