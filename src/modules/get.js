define(['broco/logic/traversal'], function(traversal) {
    function GetVariable(console) {
        this.console = console;
        this._dir = [];
        this._help = [
            'usage: get this.that',
            'Returns a variable from the console data storage.',
            'Use `get .` to see all available data.'
        ];
    }
    GetVariable.prototype.usage = function(response) {
        response.print_n(this._help);
    }
    GetVariable.prototype.process = function(args, response) {
        if (args.length != 2) {
            return this.usage(response);
        }
        var navigation = args[1];
        try {
            var root = new traversal(this.console, 'data')
            var data = (navigation == '.') ? root : root.navigate(navigation);
            response.print(data.get());
        } catch (e) {
            response.print(e.message, ['broco-entry-error']);
        }
    }

    return GetVariable;
});
