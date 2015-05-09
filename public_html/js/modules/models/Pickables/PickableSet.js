define({
    Heal: {
        position: {
            x: 0, y: 0
        },
        meshFile: "assets/rotating_pentagram.png",
        width: 65,
        height: 70,
        actorAction: function (actor) {
            actor.stamina += 30;
        }

    },
    AmmoPack: {
        position: {
            x: 0, y: 0
        },
        meshFile: "assets/rotating_pentagram.png",
        width: 65,
        height: 70,
        actorAction: function (actor) {
            
            actor.activetWeapon.ammoLeft += 30;
        }
    }


});