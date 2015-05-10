define({
    Heal: {
        position: {
            x: 0, y: 0
        },
        meshFile: "assets/rotating_pentagram_1.png",
        width: 64,
        height: 64,
        actorAction: function (actor) {
            actor.stamina += 30;
        }

    },
    AmmoPack: {
        position: {
            x: 0, y: 0
        },
        meshFile: "assets/rotating_ammo.png",
        width: 64,
        height: 64,
        actorAction: function (actor) {
            
            actor.activeWeapon.ammoLeft += 30;
        }
    }


});