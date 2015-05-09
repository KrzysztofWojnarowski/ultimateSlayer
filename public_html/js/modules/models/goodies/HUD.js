define({
    
        stamina:100,
        activeWeapon:{},
        posess:3,
        bodyCount:0,
        dimensions:null,
    
    
        update:function(actor){
            this.stamina = actor.stamina;
            this.activeWeapon = actor.activeWeapon.type;
            this.posessCounter = actor.ownerGame.possession.counter;
            this.posessLoad = actor.ownerGame.possession.tick;
            
        },
        redraw:function(viewport){
            var ctx = viewport.drawContext,dim;
            if (this.dimensions===null){
                this.dimensions = {
                    width:viewport.camera.width,
                    // put it into config
                    height:100,
                    top:300
                };
            }
            dim = this.dimensions;
            ctx.beginPath();
            
            ctx.strokeStyle = '#dd0000';
            ctx.fillStyle = '#111111';
            ctx.fillRect(0,450,1350,180);
            ctx.rect(90,475,220,20);
            ctx.fillStyle = '#dd0000';
            ctx.fillRect(90,475,2*this.stamina,20);
            ctx.font="13px Verdana";
            ctx.fillText("Stamina: ",20,490);
            ctx.fillText("Possessions Available: "+ this.posessCounter,500,490);
            ctx.moveTo(500,500);
            
            
            if (this.posessLoad===0){
                ctx.lineTo(500+180,500);
            }else{
                ctx.lineTo(500+180*(this.posessLoad/1000),500);
            }
            ctx.fillText("Body Count: "+this.bodyCount,380,490);
            ctx.closePath();
            ctx.stroke();
        }



        
        
        });