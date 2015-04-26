requirejs.config({
    baseUrl: "js/modules/",
    urlArgs: "bust=" + (new Date()).getTime()
});


require(["App"], function(App) {
    App.init();
});
