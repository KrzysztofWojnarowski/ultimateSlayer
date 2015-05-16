define({
   
    spriteFileUrl:"assets/boss.png",
    width:130,
    height:130,
    meshDataOffset:{
        walkLeft:{x:1,y:1170,loop:true,frames:9},
        walkRight:{x:1,y:1424,loop:true,frames:9},
        stand:{x:1,y:1296,loop:false,frames:1},
        jumpLeft:{x:1,y:130,loop:false,frames:7},
        jumpRight:{x:1,y:390,loop:false,frames:7},
        jumpUp:{x:1,y:260,loop:false,frames:7},
        shootRigth:{x:1,y:0,loop:false},
        shootRightBoss_bow:{x:1,y:2450,loop:false,frames:12},
        shootLeft:{x:1,y:0,loop:false},
        shootLeftBoss_bow:{x:1,y:2200,loop:false,frames:12},
        die:{x:1,y:2590,loop:false,frames:6}
    },
    meshData:{
        width:128,
        height:130
    },
    stamina:100,
    weapons:["Boss_bow"],
    ammo:[{ripper:100}],
    jumpVelocity:5,
    walkVelocity:4.5,
    deathMod:function(game){
        game.contextCollection.menuContext.endingType = "YouWon";
        game.contextCollection.menuContext.pageName = "endGame";
        game.setContext("menuContext");
        
    }
    
});