define(function() {

    var ViewPort = function() {
        this.drawContext = {};
        this.init = function(viewPortConfig) {
            var canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            this.drawContext = canvas.getContext("2d");
            this.drawContext.canvas.width=viewPortConfig.width;
            this.drawContext.canvas.height=viewPortConfig.height;
        };
        this.loadAssets = function(){}
        
    };
    
    return (ViewPort);


});