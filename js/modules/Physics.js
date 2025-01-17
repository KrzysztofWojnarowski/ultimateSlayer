define(function () {


    var Physics = function () {
        this.map = {};
        this.visibleMap = [];
        this.g = 0;
        this.init = function (map, config) {
              
            this.map = map;
            //TODO: Put g into config
            this.g = 1.45;
        };

        this.gForce = function (actor) {
            if (actor.velocity.y > 10) {
                actor.velocity.y = 10;
                return;
            }
            actor.position.y = actor.position.y + actor.velocity.y;
            actor.velocity.y = actor.velocity.y + this.g;

        };
        this.collideGround = function (actor) {
            
            var
                    actorY = actor.position.y,
                    map = actor.ownerGame.currentLevel.map.obstacles,
                    groundPositions = this.getMapAtActor(actor, map),
                    ground = this.getClosestGround(actor, groundPositions);
            
            if (ground < actorY+1 && Math.abs(ground - actorY) <= 20) {
                actor.position.y = ground ;
                actor.velocity.y = 0;
                actor.inAir = false;
            } else {
                actor.inAir = true;
            }

        };
        // vM - visible Map
        this.getMapAtActor = function (actor, vM) {
            var x = 0, ret = [],
                    ax = actor.position.x;

            for (x in vM) {
                if (vM[x][0] <= ax && vM[x][1] >= ax) {
                    ret.push(vM[x]);
                }
            }
            return ret;
        };
        this.getClosestGround = function (actor, map) {
            
            var ret = [],dist,
                    actorX = actor.position.x,
                    actorY = actor.position.y,
                    min = Math.abs(actorY - map[0][2] * actorX - map[0][3]),
                    index = 0,
                    i = 0;
            
            for (i in map) {
                dist = Math.abs(actorY - map[i][2] * actorX - map[i][3]);
                if (min > dist || dist<15 ) {
                    min = dist;
                    index = i;
                }
                
            }
            return map[index][2] * actorX + map[index][3];

        };

        this.friction = function (actor) {
            actor.velocity.x = actor.velocity.x * 0.9;
        };

        this.affectActor = function (actor,viewport) {
            actor.position.x = actor.velocity.x + actor.position.x;
            this.inbound(actor,actor.ownerGame.currentLevel,viewport);
            if (!this.collideGround(actor)) {
                this.gForce(actor);
            }
            

        };
        this.inAir = function (actor) {
            return actor.inAir;
        };

        this.getVisibleActors = function (camera, actorArray) {

        };

        this.inbound = function (actor, level,viewport) {
            var ax = actor.position.x;
            if (ax < 0) {
                actor.position.x = 0;
                actor.velocity.x = 0;
            }
            if (ax > viewport.camera.maxRight+viewport.camera.size.width*0.5) {
                actor.position.x = viewport.camera.maxRight+viewport.camera.size.width*0.5;
                actor.velocity.x = 0;
            }
            
        };

        this.ammoCollided = function (actor, ammo) {
            var
                    hx = actor.position.x,
                    hy = actor.position.y,
                    hh = actor.instance.height,
                    hw = actor.instance.width,
                    ax = ammo.position.x,
                    ay = ammo.position.y;
           if (hx<ax && hx+hw>ax && hy<ay && hy+hh>ay) return true;
           return false;
        };
        
        this.collided = function(a,b){
             var
                    hx = a.position.x,
                    hy = a.position.y,
                    hh = a.height,
                    hw = a.width,
                    ax = b.position.x,
                    ay = b.position.y,
                    aw  =b.width,
                    ah  =b.height;
                            
           if (hx<ax && hx+hw>ax && hy<ay && hy+hh>ay || 
               ax<hx && ax+aw>hx && ay<hy && ay+ah>hy     ) return true;
           return false;
        };
    };
    return (Physics);
});