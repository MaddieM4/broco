define([], function() {

    // Handles actual interactions with modules
    function BrocoConsole() {
        this.modules = {};
    }
    BrocoConsole.prototype.depend = function(root, modules, callback) {
        var self = this,
            cb_run = false,
            modules_loaded = 0,
            modules_needed = modules.length;
        function cb_wrapped() {
            var every_module_loaded = (modules_loaded == modules_needed);
            if (callback != undefined && !cb_run && every_module_loaded) {
                callback();
                cb_run = true;
            }
        }

        for (var m = 0; m < modules.length; m++) {
            var module_name = modules[m].replace('.', '/');
            var module_location = root + module_name;

            this.modules[module_name] = undefined;
            require([module_location], function (module_object) {
                self.modules[module_name] = new module_object();
                modules_loaded++;
                cb_wrapped();
            });
        }
        cb_wrapped();
    }
    BrocoConsole.prototype.process = function(command) {
        if (this.modules[command] != undefined) {
            var mod = this.modules[command];
            return mod.process(command);
        } else {
            return { lines: ["No module loaded for command '" + command + "'"] };
        }
    }

    return BrocoConsole;

});
