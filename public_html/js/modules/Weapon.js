define(function () {

    var Weapon = function () {
        this.entity = {};
        this.ammoLeft = 10;
        this.isShooting = false;
        this.shoot = function () {
            if (this.isShooting){
                return false;
            }
            this.isShooting = true;
            this.ammoLeft--;
        };

        this.isReady = true;
        this.reloadingCounter = 0;
        this.sprite = {};
        this.update = function () {
            if (this.isShooting){
                this.reloadingCounter ++;
            }
            if (this.reloadingCounter>=this.entity.reloadTime){
                this.reloadingCounter =0;
                this.isShooting=false;
                this.isReady =true;
            }
        };
        

        this.init = function (game, weaponType) {
            this.entity = this.extractEntity(game, weaponType);
            console.log("hasd entity");
        };
        this.extractEntity = function (game, weaponType) {


            var x = 0;
            for (x = 0; x < game.weapons.length; x++) {
                if (game.weapons[x].type === weaponType) {
                    return game.weapons[x];
                }
            }
        };




    };
    return (Weapon);


});