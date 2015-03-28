define({
   
    spriteFileUrl:"assets/skeleton_3.png",
    meshDataOffset:{
        walkLeft:{x:1,y:585,loop:true,frames:9},
        jumpLeft:{x:1,y:65,loop:false,frames:7},
        shootLeft:{x:1,y:0,loop:false},
        die:{x:1,y:1295,loop:false,frames:10},
        walkRight:{x:1,y:712,loop:true,frames:9},
        jumpRight:{x:1,y:195,loop:false,frames:7},
        jumpUp:{x:1,y:130,loop:false,frames:7},
        shootRigth:{x:1,y:0,loop:false},
        stand:{x:1,y:648,loop:false,frames:1}
    },
    meshData:{
        width:64,
        height:65
    },
    stamina:100,
    wepons:["ripper"],
    ammo:[{ripper:100}]
    
});