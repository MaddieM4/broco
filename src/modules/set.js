define(['broco/logic/traversal'], function(traversal) {
    function SetVariable(console) {
        this.console = console;
        this._dir = [];
        this._help = [
            'usage: set this.that = `"Some JSON Value"`',
            'Sets a variable in the console data storage.',
            'This gives you full ability to overwrite module objects. You may need to reload them afterwards if you do stupid things. The console gives you all the tools you need to break everything and fix it again, and the safety is OFF.'
        ];
    }
    SetVariable.prototype.usage = function(response) {
        response.print_n(this._help);
    }
    SetVariable.prototype.process = function(args, response) {
        if (args.length != 4) {
            return this.usage(response);
        }
        if (args[2] != '=') {
            return this.usage(response);
        }
        var navigation = args[1];
        try {
            var new_value = JSON.parse(args[3]);
        } catch (e) {
            return response.print('Bad JSON data', ['broco-entry-error']);
        }
        try {
            var root = new traversal(this.console, 'data')
            var data = (navigation == '.') ? root : root.navigate(navigation);
            data.set(new_value);
            return response.print(data.get());
        } catch(e) {
            return response.print(e.message, ['broco-entry-error']);
        }
    }

    return SetVariable;
});
