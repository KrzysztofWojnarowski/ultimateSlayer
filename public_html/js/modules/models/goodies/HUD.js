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
            ctx.fillRect(0,350,1200,180);
            ctx.rect(90,375,220,20);
            ctx.fillStyle = '#dd0000';
            ctx.fillRect(90,375,2*this.stamina,20);
            ctx.font="13px Verdana";
            ctx.fillText("Stamina: ",20,390);
            ctx.fillText("Possessions Available: "+ this.posessCounter,500,390);
            ctx.moveTo(500,400);
            
            
            if (this.posessLoad===0){
                ctx.lineTo(500+180,400);
            }else{
                ctx.lineTo(500+180*(this.posessLoad/1000),400);
            }
            ctx.fillText("Body Count: "+this.bodyCount,380,390);
            ctx.closePath();
            ctx.stroke();
        }



        
        
        });