requirejs.config({
    baseUrl: "js/modules/",
    urlArgs: "bust=" + (new Date()).getTime()
});
require(["App"], function (App) {
    App.init();
    
    document.getElementById("musicToggle").addEventListener('click', function (e) {
        if (document.getElementById("audioPlayer").volume===0) {
            document.getElementById("audioPlayer").volume=1;
            this.innerHTML ="&#x1f50A;";
            
        }else{
            document.getElementById("audioPlayer").setAttribute("muted","");
            this.innerHTML ="&#x1f507;";
            document.getElementById("audioPlayer").volume=0;
            
        }
    }, false
            );
});
