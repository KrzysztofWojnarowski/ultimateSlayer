define(function() {

    var Actor = function() {

        
        this.position = {
            x: 0, y: 0
        };
        this.frame = 0;
        this.stamina,this.wepons,this.activeWepon,this.ammo,this.sprite;
        
        this.imageData = {}; //here we hold current actors frames image
        
        this.getFrame = function() {
            return this.frame;
        };
        this.setFrame = function(index) {
            this.frame = index;
        };


        this.update = function() {
        };
        
        this.loadEntity = function(entity){
            this.entity = entity;
            this.initSprite();
            this.assignSprite();
            
        };
        
        this.initSprite = function(){
            this.sprite = new Image();
        };
        
        this.assignSprite = function(){
            this.sprite.src = this.entity.spriteFileUrl;
        };

        this.animateWalk = function(){
            
        };
        
        this.animateJump = function(){};
        
        this.animateDie = function(){};
        this.animateShoot = function(){};
        
        this.initAnimations = function(viewport){
            console.log(this);
        };
        
        


    };
    
    return (Actor);


});