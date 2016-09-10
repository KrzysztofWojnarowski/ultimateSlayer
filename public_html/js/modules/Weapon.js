define(["models/EquipmentFactory"],function (EquipmentFactory) {

    var Weapon = function () {
        this.entity = {};
        this.ammoLeft = 10;
        this.isShooting = false;
        this.ammoModel = {};
        this.ownerActor = {};
        this.direction=null;
        this.shoot = function (direction) {
            if (this.isShooting || this.ammoLeft<=0){
                return false;
            }
            this.direction=direction;
            
            this.isShooting = true;
            this.ammoLeft--;
        };

        this.isReady = true;
        this.reloadingCounter = 0;
        
        this.update = function () {
            if (this.isShooting){
                this.reloadingCounter ++;
                
                if (this.reloadingCounter===30){
                    this.ammoModel.spawn(this.direction);
                }
            }
            if (this.reloadingCounter>=this.reloadTime){
                this.reloadingCounter =0;
                this.isShooting=false;
                this.isReady =true;
            }
        };
    };
    return (Weapon);
});