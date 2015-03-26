define(function(gameInstance){
   
    var GameplayContext = function(){
        this.redraw = function(InputHandler,game,viewport){
            var level = game.getLevel();
            
            viewport.drawLevel(level);
           
        };
        
        this.update = function(inputHandler,game){
            
          
            var keysPressed = inputHandler.getKeysPressed(),
                    actor = game.getLevel().actors[0].instance;
            if (keysPressed.length===0){
                actor.animation.offset = actor.entity.meshDataOffset.stand.y;
                actor.animation.frames = actor.entity.meshData.standFrames;
            }
            for (var x in keysPressed){
                if (keysPressed[x].meaning ==="pause"){
                    game.setContext("menuContext");
                }
                if (keysPressed[x].meaning==="left"){
                    actor.animation.offset = actor.entity.meshDataOffset.walkLeft.y;
                    actor.animation.frames = actor.entity.meshData.walkFrames;
                    actor.position.x-=2;
                    
                }
                if (keysPressed[x].meaning==="right"){
                    actor.animation.offset = actor.entity.meshDataOffset.walkRight.y;
                    actor.animation.frames = actor.entity.meshData.walkFrames;
                    actor.position.x+=2;
                }
                if (keysPressed[x].meaning==="fire"){
                    actor.animation.offset = actor.entity.meshDataOffset.die.y;
                    actor.animation.frames = actor.entity.meshData.dieFrames;
                }
                
                
                
            }
           
            
        };
        
        this.buildStage = function(){
           
        };
    
    };
    
    return(GameplayContext);
    
    
});