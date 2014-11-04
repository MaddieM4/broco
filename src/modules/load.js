define(['broco/ui/util'], function(ui_util) {

    // Module for loading more modules
    function LoaderModule(console) {
        this.console = console;
        this._dir = [];
        this._help = [
            'usage: load <root> <module>...',
            'Loads AMD modules asyncronously and exposes them as command line programs.',
            'The <root> argument allows you to import multiple submodules into the command-line top level. You can leave this blank by passing in "".'
        ];
    }
    LoaderModule.prototype.usage = function(response) {
        response.print_n(this._help);
    }
    LoaderModule.prototype.process = function(args, response) {
        if (args.length < 3) {
            return this.usage(response);
        }
        var command = args[0];
        var root    = args[1];
        var modules = args.slice(2);

        if (root.length > 0 && root[root.length-1] != '/') {
            root = root + '/';
        }

        response.print_n([
            'root: ' + root,
            'modules: ' + JSON.stringify(modules),
            'Loading...'
        ]);
        this.console.depend(root, modules, function(){
            response.print("All modules loaded");
        }, function(err) {
            var rm = err.requireModules;
            var errtext = "Loading failed" + (
                (rm && rm.length) ? " on modules: " + JSON.stringify(rm)
                                  : ''
            );
            response.print(errtext, ['broco-entry-error']);
        });

        return response;
    }

    return LoaderModule;
});
