define(function(){
    
    
    var Physics = function(){
        this.map = {};
        this.g = 0;
        this.init = function(map,config){
           
            this.map = map;
            //TODO: Put g into config
            this.g = 0.2;
        };
        
        this.gForce = function (actor){
            if (actor.position.y<this.map.base){
                actor.position.y  = actor.position.y + actor.velocity.y;
                actor.velocity.y = actor.velocity.y + this.g;
            }
        };
        this.collideGround = function(actor){
            if (actor.position.y>this.map.base){
                actor.position.y = this.map.base;
                actor.velocity.y = 0;
            }
        };
        
        this.friction = function(actor){
            actor.velocity.x=actor.velocity.x*0.9;
        };
        
        this.affectActor = function(actor){
            actor.position.x = actor.velocity.x + actor.position.x;
            this.gForce(actor);
            this.collideGround(actor);
            
        };
        
        this.isIdle = function(actor){
            //console.log(Math.abs(actor.velocity.x)<0.3);
            if ((Math.abs(actor.velocity.x)<0.3 &&
                Math.abs(actor.velocity.y)<0.3) && 
                actor.position.y===this.map.base){
                    return true;
                }
             return false;   
        };
        
    };
    
    return (Physics);
});