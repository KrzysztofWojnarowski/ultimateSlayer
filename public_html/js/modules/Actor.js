define(function() {

    var Actor = function() {
        this.imageData = {
            walkLeft: {},
            walkRigth: {},
            jumpLeft: {},
            jumpRight: {}
        };

        this.animation = {
            offset: 1,
            frames: 2
        };
        this.direction = 0;
        this.previousAction = "stand";
        this.action = "stand";
        this.position = {
            x: 0, y: 50
        };
        this.directionAction = {
           "Left":-1,
           "Right":1,
           "stand":0
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
            this.imageData.walkLeft = viewport.bufferContext.getImageData(
                    coords[0], coords[1], coords[2], coords[3]);
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
            this.velocity.x = 1.2 * this.directionAction[direction];
            this.action = "walk"+direction;
            this.setAnimationWalk();
        };
        this.jump = function() {
            if (!this.isJumping()) {
                this.velocity.y = -5;
                this.position.y -= 3;
                this.action = "jump";
            }
        };



        this.shootLeft = function() {
            if (this.isShooting())
                return false;
            this.action = "shootLeft";
        };
        this.shootRight = function() {
        };
        this.stand = function() {
            if (!this.isJumping()) {
                this.setAnimationStand();
                this.action = "stand";
            }
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

        this.setAnimationWalk = function() {
            this.animation.offset = this.entity.meshDataOffset[this.action].y;
            this.animation.frames = this.entity.meshData.walkFrames;
        };
        this.setAnimationStand = function() {
            this.animation.offset = this.entity.meshDataOffset[this.action].y;
            this.animation.frames = this.entity.meshData.standFrames;

        };


    };

    return (Actor);


});