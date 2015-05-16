define(function(){
    
    var Pickable = function(){
        this.factory = {};
        this.frames  = 4;
        this.frame = 1;
        this.tick = 1;
        this.position = {
            x:0,y:0
        };
        this.startPosition = {};
        this.update = function(){
            if (this.tick%30===0){
                this.frame++;  
                this.tick=1;
            }
            this.tick++;
            if (this.frame>3){
                this.frame=1;
            };
        };
        this.setSurroundingContext = function(factory,data,game){
            this.factory = factory;
            this.cloneData = data;
            this.game = game;
        };
        
        this.clone = function(){
            return this.factory.build(Pickable,this.cloneData);
        };
        
        this.spawn = function(direction){
            var instance = this.clone();
            
            instance.setSurroundingContext(this.factory,this.cloneData,this.game);
            instance.startPosition = {
                x:instance.position.x,
                y:instance.position.y
            };
            this.game.pickables.push(instance);
        };
        
        this.onCollideActor = function(actor){
            this.actorAction(actor);
        };
        
    };
    return (Pickable);
   
});
