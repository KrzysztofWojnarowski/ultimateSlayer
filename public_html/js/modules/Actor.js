define(["models/EquipmentFactory"], function (EquipmentFactory) {

    var Actor = function () {
        this.factory = new EquipmentFactory();
        this.imageData = {
            walkLeft: {},
            walkRigth: {},
            jumpLeft: {},
            jumpRight: {}
        };
        this.jumpVelocity = 0;
        this.walkVelocity = 0;
        this.width = 0;
        this.height = 0;
        this.canInterruptAction = true;
        this.ownerGame = {};
        this.stamina = 0;

        this.animation = {
            offset: 1,
            frames: 2,
            loop: true
        };
        this.direction = 0;
        this.previousAction = "Right";
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
        this.stamina, this.weapons = [], this.activeWeapon, this.ammo, this.sprite;
        this.getFrame = function () {
            return this.frame;
        };
        this.setFrame = function (index) {
            this.frame = index;
        };
        this.update = function () {
        };
        this.loadEntity = function (entity) {
            this.entity = entity;
            this.sprite = new Image();
            this.sprite.src = entity.spriteFileUrl;
            this.jumpVelocity = entity.jumpVelocity;
            this.walkVelocity = entity.walkVelocity;
            this.width = entity.width;
            this.height = entity.height;
            this.stamina = entity.stamina;

        };

        this.initPosition = function (position) {
            this.position = position;
        };

        this.initSprite = function () {
            this.sprite = new Image();
        };
        this.assignSprite = function () {
            this.sprite.src = this.entity.spriteFileUrl;
        };
        this.setInitCoords = function (action, frames) {
            var x1, y1, x2, y2,
                    dataWidth = this.entity.meshData[frames] * this.entity.meshData.width,
                    dataHeight = this.entity.meshData.height;
            x1 = this.entity.meshDataOffset[action].x;
            y1 = this.entity.meshDataOffset[action].y;
            x2 = this.entity.meshDataOffset[action].x + dataWidth;
            y2 = this.entity.meshDataOffset[action].y + dataHeight;
            return new Array(x1, y1, x2, y2);
        };

        this.walk = function (direction) {
            if (this.isWalking() && this.direction === direction) {
                return false;
            }
            this.previousAction = direction;
            this.velocity.x = this.walkVelocity * this.directionAction[direction];
            this.action = "walk" + direction;
            this.setAnimation();
        };

        this.Shoot = function () {
            direction = this.previousAction;
            if (this.activeWeapon.ammoLeft <= 0) {
                this.stand();
                return;
            }
            this.activeWeapon.shoot(direction);
            this.action = "shoot" + direction + this.activeWeapon.type;
            this.velocity.x = 0;
            this.setAnimation();
        };
        this.jump = function (direction) {
            if (!this.isJumping()) {
                this.velocity.y = -this.jumpVelocity;
                this.position.y -= this.jumpVelocity;
            }
            
            this.action = "jump" + direction;
            this.setAnimation();
        };
        this.stand = function () {
            
            this.setAnimation();
            this.action = "stand";
            this.velocity.x = 0;
        };
        this.isJumping = function () {
            if (this.action === "jumpLeft" || this.action === "jumpRight" || this.action === "jump") {
                return true;
            }

            return false;
        };
        this.isWalking = function () {
            if (this.action === "walkLeft" || this.action === "walkRight") {
                return true;
            }
            return false;
        };

        this.isStanding = function () {
            if (this.action === "stand")
                return true;
            return false;
        };

        this.isShooting = function () {
            if (this.action === "shootLeft" || this.action === "shootRight") {
                return true;
            }
            return false;
        };

        this.setAnimation = function () {
            this.animation.offset = this.entity.meshDataOffset[this.action].y;
            this.animation.frames = this.entity.meshDataOffset[this.action].frames;
            this.animation.loop = this.entity.meshDataOffset[this.action].loop;
        };



        this.setActiveWeapon = function (weapon) {
            this.activeWeapon = weapon;
        };

        this.onCollideAmmo = function (ammo) {
            this.stamina -= ammo.damage;

        };


        this.posess = function () {
            var x, minDist,dist,pointer,tmp,
                    actorsList = this.ownerGame.currentLevel.actors,
                    hx = this.position.x,
                    hy = this.position.y;
            minDist = 1000;
            pointer = 0;
            for (x = 1; x < actorsList.length; x++) {
                if (!actorsList[x].instance.isAlive()) {
                    continue;
                }
                dist = Math.abs(hx - actorsList[x].instance.position.x) + Math.abs(hy + actorsList[x].instance.position.y);
                if (dist<minDist && actorsList[x].instance.isAlive()){
                    minDist = dist;
                    pointer = x;
                }

            }
            console.log(actorsList.length,pointer);
            tmp = actorsList[0];
            actorsList[0] = actorsList[pointer];
            actorsList[pointer] = tmp;
        };


        this.die = function () {
            this.action = "die";
            this.velocity.x = 0;
            this.setAnimation();
            return;
            // second death concept;
            var aList = this.ownerGame.currentLevel.actors;
            for (var x in aList) {
                if (aList[x].instance === this) {
                    aList.splice(x, 1);
                }
            }

        };
        this.isAlive = function () {
            return this.stamina >= 0 ? true : false;
        };




    };
    return (Actor);
});