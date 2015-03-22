define(function(gameInstance){
   
    var GameplayContext = function(){
        this.redraw = function(InputHandler,game,viewport){
            var level = game.getLevel();
            
            viewport.drawLevel(level);
           
        };
        
        this.update = function(inputHandler,game){
            var keysPressed = inputHandler.getKeysPressed();
            for (var x in keysPressed){
                if (keysPressed[x].meaning ==="pause"){
                    game.setContext("menuContext");
                }
            }
           
            
        };
        
        this.buildStage = function(){
           
        };
    
    };
    
    return(GameplayContext);
    
    
});