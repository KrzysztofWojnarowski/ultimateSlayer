define({
   type:"Spear", 
   distance:true,
   ammo:"SpearAmmo",
   ammoLeft:500000,
   meshFile:"assets/spear_male.png",
   reloadTime:5,
   velocity:{
    x:1,
    y:0
   },
   animation:{
       shootLeftSpear:{x:1,y:455,loop:true,frames:8},
       ShootRightSpear:{x:1,y:365,loop:true,frames:8}
   }
});