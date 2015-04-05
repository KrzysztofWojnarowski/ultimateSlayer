define(function () {


    var Physics = function () {
        this.map = {};
        this.visibleMap = [];
        this.g = 0;
        this.init = function (map, config) {

            this.map = map;
            //TODO: Put g into config
            this.g = 0.2;
        };

        this.gForce = function (actor) {
            if (actor.velocity.y < -10) {
                actor.velocity.y = -10;
                return;
            }
            actor.position.y = actor.position.y + actor.velocity.y;
            actor.velocity.y = actor.velocity.y + this.g;

        };
        this.collideGround = function (actor) {
            var
                    actorY = actor.position.y,
                    actorX = actor.position.x,
                    i = 0,
                    map = this.visibleMap,
                    groundPositions = this.getMapAtActor(actor, map),
                    ground = this.getClosestGround(actor, groundPositions);
            if (ground < actor.position.y && Math.abs(ground - actor.position.y)<=10 ) {
                actor.position.y = ground;
                actor.velocity.y = 0;
                actor.inAir = false;
            } else {
                actor.inAir = true;
            }

        };
        // vM - visible Map
        this.getMapAtActor = function (actor, vM) {
            var x = 0, ret = [];

            for (x in vM) {
                if (vM[x][0] <= actor.position.x && vM[x][1] >= actor.position.x) {
                    ret.push(vM[x]);
                }
            }
            return ret;
        }
        this.getClosestGround = function (actor, map) {
            var ret = [],
                    actorX = actor.position.x,
                    actorY = actor.position.y,
                    min = Math.abs(actorY - map[0][2] * actorX - map[0][3]),
                    index = 0,
                    i = 0;
            for (i in map) {
                if (min > Math.abs(actorY - map[i][2] * actorX - map[i][3])) {
                    min = Math.abs(actorY - map[i][2] * actorX - map[i][3]);
                    index = i;
                }
            }
            return map[index][2] * actorX + map[index][3];

        }

        this.friction = function (actor) {
            actor.velocity.x = actor.velocity.x * 0.9;
        };

        this.affectActor = function (actor) {
            actor.position.x = actor.velocity.x + actor.position.x;
            if (!this.collideGround(actor)) {
                this.gForce(actor);
            }

        };



        this.inAir = function (actor) {
            return actor.inAir;
        };

        this.getVisibleActors = function (camera, actorArray) {

        };

        this.setVisibleMap = function (viewport) {
            var i = 0;
            this.visibleMap = [],
                    map = this.map.obstacles;
            for (i in map) {

                if (viewport.inSight(map[i][0]) || viewport.inSight(map[i][1])) {
                    this.visibleMap.push(map[i]);
                }
            }
            ;
        };

        this.inbound = function(actor,level){
            if (actor.position.x<0){
                actor.position.x = 0;
                actor.velocity.x = 0;
            }
            if (actor.position.x>level.width){
                actor.position.x = level.width;
                actor.velocity.x = 0;
            }
        }


    };

    return (Physics);
});