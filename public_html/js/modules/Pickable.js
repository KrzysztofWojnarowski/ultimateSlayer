define(function(){
    
    var Pickable = function(){
        this.factory = {};
        this.position = {
            x:0,y:0
        };
        this.startPosition = {};
        this.update = function(){
            
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
