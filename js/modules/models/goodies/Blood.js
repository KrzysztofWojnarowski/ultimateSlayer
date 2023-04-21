define({
    isLoading: false,
    isLoaded:false,
    drawNext:false,
    current:0,
    shallBeDrawn:false,
    position:{
        x:0,y:-100
    },
    ticker: 0,
    frames: ["blood1.png", "blood2.png", "blood3.png", "blood4.png"],
    frameImages: [],
    update: function () {
        if (this.shallBeDrawn===false){
            return;
        }
        if (this.ticker%20===0 && this.frameImages.length>this.current){
            this.current++;
        }
        if (this.ticker>80){
            this.ticker=0;
        }
        this.ticker++;
        if (this.current>3){
            this.current=0;
            this.shallBeDrawn=false;
        }
        

    },
    
    trigger:function(){
        this.shallBeDrawn=true;
        this.current=0;
        this.position.x = -100+110*Math.random()*(Math.random()>0.5?1:-1);
        this.position.y = -100*Math.random();
    },
    
    redraw: function (viewport) {
        if (this.shallBeDrawn===false){
            return true;
        }
         viewport.drawContext.drawImage(this.frameImages[this.current],this.position.x,this.position.y);
    },
    load: function () {
        var x,c;
        if (this.isLoading === false && this.isLoaded===false) {
            for (x in this.frames) {
                var im = new Image();
                im.src = "assets/"+this.frames[x];
                this.frameImages.push(im);
            }
            this.isLoading = true;
        }
        if(this.isLoading===true && this.isLoaded===false){
            c=0;
            for (x in this.frameImages){
                if (this.frameImages[x].naturalWidth!==0){
                    c++;
                }
            }
            if (c===x-1){
                this.isLoaded=true;
            }
        }
    }





});

