define([], function() {

    function MotdModule() {
        this.message = "Standard default MOTD message.\nYou might not replace it, but your friends will laugh at you if you don't."
    }
    MotdModule.prototype.process = function(_, response) {
        response.print_split(this.message);
    }

    return MotdModule;
});
