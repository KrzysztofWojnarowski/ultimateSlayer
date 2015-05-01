define(function(){
    
    var Ammo = function(){
        this.ownerWeapon = {};
        this.direction = 1;
        this.hitTarget = false;
        this.factory = {};
        this.position = {
            x:0,y:0
        };
        this.startPosition = {};
        this.update = function(){
            
            if (Math.abs(this.startPosition.x - this.position.x )>this.distance || this.hitTarget){
                this.game.ammoArray.splice(this,1);
                return;
            };
            this.position.x=this.position.x + this.velocity.x*this.direction;
        };
        this.setSurroundingContext = function(factory,data,game,weapon){
            
            this.factory = factory;
            this.cloneData = data;
            this.game = game;
            this.ownerWeapon = weapon;
        };
        
        this.clone = function(){
            return this.factory.build(Ammo,this.cloneData);
        };
        
        this.spawn = function(direction){
            var instance = this.clone();
            instance.direction = direction==="Right"?1:-1;
            instance.setSurroundingContext(this.factory,this.cloneData,this.game,this.ownerWeapon);
            if (instance.direction===1){
                instance.position.x = this.ownerWeapon.ownerActor.position.x+65;
            }else{
                instance.position.x = this.ownerWeapon.ownerActor.position.x;
            }
            
            instance.position.y = this.ownerWeapon.ownerActor.position.y+30;
            
            
            instance.startPosition = {
                x:instance.position.x,
                y:instance.position.y
            };
            this.game.ammoArray.push(instance);
        };
        
        this.onCollideActor = function(){
            this.hitTarget = true;
        };
        
    };
    
    return (Ammo);
    
    
    
});
