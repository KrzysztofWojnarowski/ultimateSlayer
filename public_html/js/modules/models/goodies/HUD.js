define({
    
        stamina:100,
        activeWeapon:{},
        posess:3,
    
    
        update:function(actor){
            this.stamina = actor.instance.stamina;
            this.activeWeapon = actor.instance.activeWeapon.type;
        },
        redraw:function(viewport){
            
        }



        
        
        });