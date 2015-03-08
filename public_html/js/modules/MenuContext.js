define(function(){
   
    var MenuContext = function(){
        this.redraw = function(){
            console.log("redrawing Menu");
        };
        
        this.update = function(inputHandler,game){
            
            console.log("updateing Menu");
        };
    
    };
    
    return(MenuContext);
    
    
});