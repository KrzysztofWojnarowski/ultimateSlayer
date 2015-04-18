define(function(){
    
    var Ammo = function(){
        this.position = {
            x:0,y:0
        };
        this.velocity = {
            x:0,y:0
        };
        this.type = "Arrow";
        this.damage = 10;
        this.update = function(){};
        
        
    };
    
    return (Ammo);
    
    
    
});
