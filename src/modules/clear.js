define([], function() {

    function ClearModule(console) {
        this.console = console;
        this._dir = [];
        this._help = [
            'Clear the console output. Clean slate for thinking straight.'
        ];
    }
    ClearModule.prototype.process = function() {
        var element = this.console.ui.entries;
        while (element.firstChild) element.removeChild(element.firstChild);
    }

    return ClearModule;
});
