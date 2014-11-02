define([], function() {

    // Handles actual interactions with modules
    function BrocoConsole() {
    }
    BrocoConsole.prototype.process = function() {
        return {
            'lines': ["abc", "123"]
        }
    }

    return BrocoConsole;

});
