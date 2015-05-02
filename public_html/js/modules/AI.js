define({
    process: function (game, actor, hero) {


        var ax = actor.position.x,
                ay = actor.position.y,
                hx = hero.position.x,
                hy = hero.position.y,
                desiredDirection = hx - ax <= 0 ? "Left" : "Right",
                effectiveRange = actor.activeWeapon.ammoModel.distance;
        
        
        
        if (Math.random()>game.difficultyFactor){
            return;
        }
        if (Math.abs(ay-hy)>10){
            actor.walk(desiredDirection);
            return;
        }
        if (Math.abs(ax-hx)>effectiveRange){
            actor.walk(desiredDirection);
            return;
        }else{
            actor.previousAction = desiredDirection;
            actor.Shoot(desiredDirection);
            return;
        }
    }
    
    
    



});