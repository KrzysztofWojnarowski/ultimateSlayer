define(
        function () {

            var EquipmentFactory = function () {
                this.build = function (EquipmentConstructor, data) {
                    var ret = new EquipmentConstructor();
                    this.cloneData(data,ret);
                    ret.sprite = new Image();
                    ret.sprite.src = ret.meshFile;
                    
                    return ret;
                };

                this.cloneData = function (srcObj, dst) {
                    for (var x in srcObj) {
                        if (typeof srcObj[x] !== "object") {
                            dst[x] = srcObj[x];
                        } else {
                            dst[x] = {};
                            dst[x] = this.cloneData(srcObj[x], dst[x]);
                        }
                    }
                    return dst;
                    
                };


            };
            return (EquipmentFactory);
        }


);

