define(function () {
    var Hit = function () {


        this.isLoading = false;
        this.isLoaded = false;
        this.drawNext = false;
        this.current = 0;
        this.shallBeDrawn = false;
        this.position = {
            x: 0, y: -100
        };
        this.sprite = "hit.png";
        this.ticker = 0;
        this.frames = 3;
        this.update = function () {
            
            if (this.shallBeDrawn === false) {
                return;
            }
            
            if (this.ticker % 8 === 0 && this.frames > this.current) {
                this.current++;
            }
            if (this.ticker > 80) {
                this.ticker = 0;
            }
            this.ticker++;
            if (this.current >= this.frames) {
                this.current = 0;
                this.shallBeDrawn = false;
            }


        };
        this.trigger = function (actor) {
            this.shallBeDrawn = true;
            this.current = 0;
        };
        this.redraw = function (viewport, actor) {
            if (this.shallBeDrawn === false) {
                return true;
            }
           
            viewport.drawContext.drawImage(this.spriteImage,
                    actor.entity.meshData.width * this.current,
                    0,65,65,
                    actor.position.x + viewport.camera.position.x, actor.position.y + viewport.camera.position.y,
                    65,
                    65);

        };
        this.load = function () {
            var x, c;
            if (this.isLoading === false && this.isLoaded === false) {
                var im = new Image();
                im.src = "assets/" + this.sprite;
                this.spriteImage = im;
                this.isLoading = true;
            }
            this.isLoaded = this.spriteImage.naturalWidth !== 0;

        };

    };
    return (Hit);
});

