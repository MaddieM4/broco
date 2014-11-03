define(['broco/ui/util'], function(ui_util) {

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
            if (response.element) {
                var div = ui_util.newClassDiv('broco-entry-response-line');
                div.appendChild(document.createTextNode("All modules loaded"));
                response.element.appendChild(div);
            } else {
                response.lines.push("All modules already loaded");
            }
        });

        return response;
    }

    return LoaderModule;
});
