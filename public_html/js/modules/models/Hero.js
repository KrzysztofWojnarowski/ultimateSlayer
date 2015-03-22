define({
   
    spriteFileUrl:"assets/skeleton_3.png",
    meshDataOffset:{
        walkLeft:{x:1,y:585},
        jumpLeft:{x:1,y:0},
        shootLeft:{x:1,y:0},
        die:{x:1,y:1295},
        walkRight:{x:1,y:712},
        jumpRigth:{x:1,y:0},
        shootRigth:{x:1,y:0},
        stand:{x:1,y:648},
        dieRigth:{x:1,y:0}
    },
    meshData:{
        width:64,
        height:65,
        walkFrames:9,
        jumpFrames:10,
        standFrames:1,
        dieFrames:10
    },
    stamina:100,
    wepons:["ripper"],
    ammo:[{ripper:100}]
    
});