define(function() {

    var ViewPort = function() {
        this.drawContext = {};
        this.window = {};
        this.init = function(viewPortConfig) {
            var canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            this.drawContext = canvas.getContext("2d");
            this.drawContext.canvas.width=viewPortConfig.width;
            this.drawContext.canvas.height=viewPortConfig.height;
        };
       this.putActor = function(mesh){
           
       };
       
       this.getPerspective = function(){
           return this.camera.perspective;
       };
       this.getPosition = function(){
           return this.camera.position;
       };
       this.setPosition = function(actor){
           this.camera.position.x-=2;
           this.camera.position.y=0;
       };
       this.setPerspective = function(){
           this.camera.perspective.x+=5;
           this.camera.perspective.y=0;
       };
       
       this.camera = {
           position:{
               x:0,
               y:0
           },
           perspective: {
               x:-800,y:0
           }
          
       };
       
       this.drawLevel  = function(level){
           //this.drawContext.clearContext();
           this.setPerspective();
           this.setPosition();
           var perspective = this.getPerspective();
           var position =this.getPosition();
           this.drawContext.drawImage(level.imageData.background,perspective.x,perspective.y);
           this.drawContext.drawImage(level.imageData.foreground,position.x,position.y);
       };
      
        
    };
    
    
    
    return (ViewPort);


});