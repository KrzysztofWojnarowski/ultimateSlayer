define({
   
    spriteFileUrl:"assets/skeleton_3.png",
    meshDataOffset:{
        walkLeft:{x:0,y:0},
        jumpLeft:{x:0,y:0},
        shootLeft:{x:0,y:0},
        standLeft:{x:0,y:0},
        dieLeft:{x:0,y:0},
        walkRight:{x:0,y:0},
        jumpRigth:{x:0,y:0},
        shootRigth:{x:0,y:0},
        standRigth:{x:0,y:0},
        dieRigth:{x:0,y:0}
    },
    meshData:{
        width:65,
        height:65,
        walkFrames:9,
        jumpFrames:10,
        standFrames:7,
        dieFrames:10
    },
    stamina:100,
    wepons:["ripper"],
    ammo:[{ripper:100}]
    
});