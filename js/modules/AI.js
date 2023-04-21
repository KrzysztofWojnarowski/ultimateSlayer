define({
    process: function (game, actor, hero,inputHandler) {
        var ax = actor.position.x,
                ay = actor.position.y,
                hx = hero.position.x,
                hy = hero.position.y,
                desiredDirection = hx - ax <= 0 ? "Left" : "Right",
                notDesiredDirection = hx - ax <= 0 ? "Right" : "Left",
                effectiveRange = actor.activeWeapon.ammoModel.distance;
        if (Math.abs(ax-hx)>800 || Math.abs(ay-hy)>500){
            actor.stand();
            return;
        }
        if ( Math.random()>game.difficultyFactor ){
            return;
        }
        if (Math.abs(ay-hy)>10 && actor.stamina>=20){
            actor.walk(desiredDirection);
            return;
        }
        if (Math.abs(ax-hx)>effectiveRange){
            actor.walk(desiredDirection);
            return;
        }else {
            if (actor.stamina<=20){
                Math.random()<0.05?actor.jump(notDesiredDirection):actor.walk(notDesiredDirection);
                return;
            }
            
            actor.previousAction = desiredDirection;
            actor.Shoot(desiredDirection,inputHandler.mousePosition);
            return;
        }
    }
    
    
    



});