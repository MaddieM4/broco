define(['broco/ui/util'], function(ui_util) {

    function tack_line_on(response, text, err) {
        var div = ui_util.newClassDiv('broco-entry-response-line');
        if (err) {
            div.classList.add('broco-entry-error');
        }
        div.appendChild(document.createTextNode(text));

        if (response.element) {
            response.element.appendChild(div);
        } else {
            response.lines.push(div);
        }
    }

    // Module for loading more modules
    function LoaderModule(console) {
        this.console = console;
    }
    LoaderModule.prototype.usage = function() {
        return { lines: [
            'usage: load <root> <module>...',
            'Loads AMD modules asyncronously and exposes them as command line programs.',
            'The <root> argument allows you to import multiple submodules into the command-line top level. You can leave this blank by passing in "".',
        ]};
    }
    LoaderModule.prototype.process = function(args) {
        if (args.length < 3) {
            return this.usage();
        }
        var command = args[0];
        var root    = args[1];
        var modules = args.slice(2);

        if (root.length > 0 && root[root.length-1] != '/') {
            root = root + '/';
        }

        var response = { lines: [
            'root: ' + root,
            'modules: ' + JSON.stringify(modules),
            'Loading...'
        ]};
        this.console.depend(root, modules, function(){
            tack_line_on(response, "All modules loaded", false);
        }, function(err) {
            var rm = err.requireModules;
            var errtext = "Loading failed" + (
                (rm && rm.length) ? " on modules: " + JSON.stringify(rm)
                                  : ''
            );
            tack_line_on(response, errtext, true);
        });

        return response;
    }

    return LoaderModule;
});
