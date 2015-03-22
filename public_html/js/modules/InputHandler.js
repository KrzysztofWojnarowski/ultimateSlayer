define(["Controlls"], function(controlls) {

    function InputHandler(controlls) {
        this.controlls = controlls;
        this.movesBlocked = false;
        this.bindControlls = function() {
            var keyMap = [],
                    controllsList = this.controlls;
            for (var i in controllsList) {
                var singleKey = new Object();
                singleKey.isSet = false;
                singleKey.meaning = controllsList[i];
                singleKey.code = i;
                keyMap.push(singleKey);
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
        /**
         * 
         * @param {type} e
         * @param {type} state
         * @returns {undefined}
         */
        this.setKey = function(e, state) {

            for (var x in this.keyMap) {

                if (parseInt(this.keyMap[x].code) === e.keyCode) {
                    this.keyMap[x].isSet = state;
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
                    ret.push(this.keyMap[x]);
                }
                ;
            }
            return ret;
        };
    }
    inputHandler = new InputHandler(controlls);
    document.addEventListener("keydown", function(e) {
        inputHandler.setKey(e, true);
    });
    document.addEventListener("keyup", function(e) {
        inputHandler.setKey(e, false);
    });
    return inputHandler;
});