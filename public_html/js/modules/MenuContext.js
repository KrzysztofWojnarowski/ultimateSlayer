define(function(){
   
    var MenuContext = function(){
        this.redraw = function(){
           // console.log("redrawing Menu");
        };
        
        this.update = function(inputHandler,game){
            var keysPressed = inputHandler.getKeysPressed();
            
            for (var x in keysPressed){
                //console.log(keysPressed[x].meaning);
                if (keysPressed[x] ==="Esc"){
                    
                    game.setContext("gameplayContext");
                }
            }
            //console.log("updating Menu");
        };
    
    };
    
    return(MenuContext);
    
    
});