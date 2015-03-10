define(function(gameInstance){
   
    var GameplayContext = function(){
        this.redraw = function(){
            console.log("redrawing Gameplay");
        };
        
        this.update = function(inputHandler,game){
            var keysPressed = inputHandler.getKeysPressed();
            for (var x in keysPressed){
                if (keysPressed[x].meaning ==="pause"){
                    game.setContext("MenuContext");
                }
            }
            console.log("updating Gameplay");
        };
    
    };
    
    return(GameplayContext);
    
    
});