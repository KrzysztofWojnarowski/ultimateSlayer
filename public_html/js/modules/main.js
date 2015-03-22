requirejs.config({
    baseUrl: "js/modules/"
});

require(["App"], function(App) {
    App.init();
});
