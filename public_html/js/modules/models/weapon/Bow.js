define({
   type:"Bow", 
   distance:true,
   ammo:"Arrow",
   ammoLeft:50,
   meshFile:"assets/bow.png",
   sprite:new Image(),
   ammoVelocity:10,
   reloadTime:100,
   animation:{
       shootLeft:{x:1,y:1105,loop:true,frames:9},
       ShootRight:{x:1,y:1235,loop:true,frames:9}
   }
});