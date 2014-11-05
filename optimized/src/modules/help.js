define([], function() {

    function HelpModule(console) {
        this.console = console;
        this.tutorials = {};
        this._dir = ['tutorials'];
        this._help = [
            'usage: help <thing>',
            "Get documentation on any module or topic. As long as there's documentation, anyways!"
        ];
    }
    HelpModule.prototype.get_tutorial_names = function() {
        var tutorials = [];
        for (var key in this.tutorials) {
            tutorials.push(key);
        }
        return tutorials;
    }
    HelpModule.prototype.get_mods_with_docs = function() {
        var mods = [];
        for (var key in this.console.modules) {
            var module = this.console.modules[key];
            if (module._help != undefined) {
                mods.push(key);
            }
        }
        return mods;
    }
    HelpModule.prototype.print_list = function(title, failmsg, array) {
        if (array.length == 0) {
            return [failmsg];
        } else {
            var lines = [title];
            for (var i = 0; i < array.length; i++) {
                lines.push("\t" + array[i]);
            }
            return lines;
        }
    }
    HelpModule.prototype.process = function(args, response) {
        if (args.length != 2) {
            response.print_n( this._help.concat(
                this.print_list("Tutorials:", "No tutorials", this.get_tutorial_names())
            ).concat(
                this.print_list("Modules:", "No documented modules", this.get_mods_with_docs())
            ));
        } else {
            var name = args[1];
            var module = this.console.modules[name];
            var tutorial = this.tutorials[name];

            if (module != undefined && module._help != undefined) {
                var type = "Module", lines = module._help;
            } else if (tutorial != undefined) {
                var type = "Tutorial", lines = tutorial;
            }
            if (type != undefined) {
                return response.print_n([
                    type + " `" + name + "`:"
                ].concat(lines));
            } else {
                return response.print("No documentation found for `" + name + "`")
            }
        }
    }

    return HelpModule;
});
