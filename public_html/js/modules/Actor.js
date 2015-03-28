define(function() {

    var Actor = function() {
        this.imageData = {
            walkLeft: {},
            walkRigth: {},
            jumpLeft: {},
            jumpRight: {}
        };
        this.jumpVelocity = 0;
        this.walkVelocity = 0;

        this.animation = {
            offset: 1,
            frames: 2,
            loop: true
        };
        this.direction = 0;
        this.previousAction = "stand";
        this.action = "stand";
        this.position = {
            x: 0, y: 50
        };
        this.directionAction = {
            "Left": -1,
            "Right": 1,
            "stand": 0
        };
        this.velocity = {
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
            this.jumpVelocity = entity.jumpVelocity;
            this.walkVelocity = entity.walkVelocity;
            console.log(entity);

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
            var coords = this.setInitCoords("walkLeft", "walkFrames");


        };
        this.setInitCoords = function(action, frames) {
            var x1, y1, x2, y2,
                    dataWidth = this.entity.meshData[frames] * this.entity.meshData.width,
                    dataHeight = this.entity.meshData.height;
            x1 = this.entity.meshDataOffset[action].x;
            y1 = this.entity.meshDataOffset[action].y;
            x2 = this.entity.meshDataOffset[action].x + dataWidth;
            y2 = this.entity.meshDataOffset[action].y + dataHeight;
            return new Array(x1, y1, x2, y2);
        };

        this.walk = function(direction) {
            if (this.isWalking() && this.direction === direction) {
                return false;
            }
            this.velocity.x = this.walkVelocity * this.directionAction[direction];
            this.action = "walk" + direction;
            this.setAnimation();
        };
        this.jump = function(direction) {
            if (!this.isJumping()) {
                this.velocity.y = -this.jumpVelocity;
                this.position.y -= this.walkVelocity;
                this.action = "jump" + direction;
            }
            this.action = "jump" + direction;
            this.setAnimation();
        };



        this.shootLeft = function() {
            if (this.isShooting())
                return false;
            this.action = "shootLeft";
        };
        this.shootRight = function() {
        };
        this.stand = function() {

            this.setAnimation();
            this.action = "stand";

            if (Math.abs(this.velocity.x) > 0.3) {
                if (this.velocity.x > 0) {
                    this.velocity.x -= 0.5;
                } else {
                    this.velocity.x += 0.5;
                }

            } else {
                this.velocity.x = 0;
                return false;
            }
        };
        this.isJumping = function() {
            if (this.action === "jumpLeft" || this.action === "jumpRight" || this.action === "jump") {
                return true;
            }

            return false;
        };
        this.isWalking = function() {
            if (this.action === "walkLeft" || this.action === "walkRight") {
                return true;
            }
            return false;
        };

        this.isStanding = function() {
            if (this.action === "stand")
                return true;
            return false;
        };

        this.isShooting = function() {
            if (this.action === "shootLeft" || this.action === "shootRight") {
                return true;
            }
            return false;
        };

        this.setAnimation = function() {
            //console.log(this.action);
            this.animation.offset = this.entity.meshDataOffset[this.action].y;
            this.animation.frames = this.entity.meshDataOffset[this.action].frames;
            this.animation.loop = this.entity.meshDataOffset[this.action].loop;
        };

        /*this.setAnimationJump = function() {
         this.animation.offset = this.entity.meshDataOffset[this.action].y;
         this.animation.frames = this.entity.meshData.JumpFrames;
         this.animation.loop = this.entity.meshDataOffset[this.action].loop;
         };
         
         this.setAnimationStand = function() {
         this.animation.offset = this.entity.meshDataOffset[this.action].y;
         this.animation.frames = this.entity.meshData.standFrames;
         this.animation.loop = this.entity.meshDataOffset[this.action].loop;
         
         };*/


    };

    return (Actor);


});