define(function(){
    
    var Ammo = function(){
        this.ownerWeapon = {};
        this.direction = 1;
        this.factory = {};
        this.position = {
            x:0,y:0
        };
        this.startPosition = {};
        this.update = function(){
            if (this.startPosition.x - this.position.x >this.distance){
                this.game.ammoArray.splice(this,1);
                return;
            };
            this.position.x+=this.velocity.x*this.direction;
            
            
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
            instance.setSurroundingContext(this.factory,this.cloneData,this.game,this.ownerWeapon);
            instance.position.x = this.ownerWeapon.ownerActor.position.x+65;
            instance.position.y = this.ownerWeapon.ownerActor.position.y+30;
            this.direction = direction==="Right"?1:-1
            instance.startPosition = {
                x:instance.position.x,
                y:instance.position.y
            };
            this.game.ammoArray.push(instance);
        }
        
    };
    
    return (Ammo);
    
    
    
});
