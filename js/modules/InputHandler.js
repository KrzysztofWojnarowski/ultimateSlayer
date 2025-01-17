define(["Controlls"], function(controlls) {

    function InputHandler(controlls) {
        this.controlls = controlls;
        this.movesBlocked = false;
        this.bufferSize = 0;
        this.mouseEvent = null;
        this.keyboardState = {};
        this.mousePosition = {x:0,y:0};
        this.bindControlls = function() {
            var keyMap = [],
                    controllsList = this.controlls;
            for (var i in controllsList) {
                var singleKey = new Object();
                singleKey.isSet = false;
                singleKey.meaning = controllsList[i];
                singleKey.code = i;
                keyMap.push(singleKey);
                this.keyboardState[singleKey.meaning] = false;
            }
            return keyMap;
        };
        this.keyMap = {};
        /**
         * 
         * @returns {undefined}
         */
        this.init = function() {
            this.keyMap = this.bindControlls();
        };
        
        this.clearQueue = function(){
            this.keyboardState = {};
        }
        /**
         * 
         * @param {type} e
         * @param {type} state
         * @returns {undefined}
         */
        this.setKey = function(e, state) {
            var keyMap = this.keyMap;
            if (state===true){
                this.bufferSize=1;
            }else{
                this.bufferSize=0;
            }
            for (var x in keyMap) {
                if (parseInt(keyMap[x].code) === e.keyCode) {
                    keyMap[x].isSet = state;
                    this.keyboardState[keyMap[x].meaning] = state;
            
                }
            }
        };
        /**
         * return array of pressed keys empty if none
         * @returns {Array}
         */
        this.getKeysPressed = function() {
            var ret = [];
            for (var x in this.keyMap) {
                if (this.keyMap[x].isSet === true) {
                    ret.push(this.keyMap[x].meaning);
                }
                ;
            }
            return ret;
        };
        
        this.isPressed = function(meaning){
           return this.keyboardState[meaning];
        };
    }
    var inputHandler = new InputHandler(controlls);
    document.addEventListener("keydown", function(e) {
        e.preventDefault();
        inputHandler.setKey(e, true);
    });
    document.addEventListener("keyup", function(e) {
        e.preventDefault();
        inputHandler.setKey(e, false);
    });
    document.addEventListener('mousedown',function(e){
        e.preventDefault();
        inputHandler.keyboardState["Fire"] = true;
        inputHandler.mouseEvent = e;
        inputHandler.mousePosition = {
            x:e.offsetX,
            y:e.offsetY
        }
    });
    
    document.addEventListener('mouseup',function(e){
        e.preventDefault();
        inputHandler.keyboardState.Fire = false;
    });

    document.addEventListener('mousemove',function(e){
        e.preventDefault();
        inputHandler.mousePosition = {
            x:e.offsetX,
            y:e.offsetY
        }
    });

    
    return inputHandler;
});
