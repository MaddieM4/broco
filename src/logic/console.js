define(['broco/logic/lex'], function(lex) {

    // Handles actual interactions with modules
    function BrocoConsole() {
        this.modules = {};
    }
    BrocoConsole.prototype.depend = function(root, modules, callback) {
        var self = this,
            module_names = [],
            module_locations = [];
        for (var m = 0; m < modules.length; m++) {
            var module_name = modules[m].replace('/', '.');
            module_names.push(module_name);
            module_locations.push( (root + module_name).replace('.','/') );
            this.modules[module_name] = undefined;
        }
        require(module_locations, function() {
            for (var i=0; i<modules.length; i++) {
                var module_name = module_names[i];
                var module_object = arguments[i];
                self.modules[module_name] = new module_object(self);
            }
            if (callback != undefined) callback();
        });
    }
    BrocoConsole.prototype.process = function(value) {
        var args = lex(value);
        var command = args[0];
        if (this.modules[command] != undefined) {
            var mod = this.modules[command];
            return mod.process(args);
        } else {
            return { lines: ["No module loaded for command '" + command + "'"] };
        }
    }

    return BrocoConsole;

});
