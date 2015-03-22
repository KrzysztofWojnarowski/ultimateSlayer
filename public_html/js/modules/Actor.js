define(function() {

    var Actor = function() {
        this.imageData = {
            walkLeft: {},
            walkRigth: {},
            jumpLeft: {},
            jumpRight: {}
        };
        
        this.animation={
            offset:1,
            frames:2
        };
        this.previousAction = "stand";
        this.position = {
            x: 0, y: 0
        };
        this.frame = 0;
        this.stamina, this.wepons, this.activeWepon, this.ammo, this.sprite;
        this.getFrame = function() {
            return this.frame;
        };
        this.setFrame = function(index) {
            this.frame = index;
        };


        this.update = function() {
        };

        this.loadEntity = function(entity) {
            this.entity = entity;
            this.initSprite();
            this.assignSprite();

        };

        this.initSprite = function() {
            this.sprite = new Image();
        };

        this.assignSprite = function() {
            this.sprite.src = this.entity.spriteFileUrl;
        };
        this.initAnimations = function(game, viewport) {
            viewport.bufferContext.drawImage(this.sprite, 0, 0);
            this.initWalkLeft(viewport);
        };
        this.initWalkLeft = function(viewport) {
            var coords = this.setInitCoords("walkLeft","walkFrames");
            this.imageData.walkLeft = viewport.bufferContext.getImageData(
                    coords[0],coords[1],coords[2],coords[3]);
        };
        this.setInitCoords  = function(action,frames){
            var x1, y1, x2, y2,
                    dataWidth = this.entity.meshData[frames] * this.entity.meshData.width,
                    dataHeight = this.entity.meshData.height;
            x1 = this.entity.meshDataOffset[action].x;
            y1 = this.entity.meshDataOffset[action].y;
            x2 = this.entity.meshDataOffset[action].x + dataWidth;
            y2 = this.entity.meshDataOffset[action].y + dataHeight;
            return new Array(x1,y1,x2,y2);
        };
    };

    return (Actor);


});