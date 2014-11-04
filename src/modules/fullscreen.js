define([], function() {
    function Fullscreen(console) {
        this.console = console;
        this._dir = [];
    }
    Fullscreen.prototype.usage = function(response) {
        response.print_n([
            'usage: fullscreen [on|off|toggle]',
            'Controls whether console is fullscreen. If no argument is given, `toggle` is assumed as default.'
        ]);
    }
    Fullscreen.prototype.process = function(args, response) {
        if (args.length > 2) {
            return this.usage(response);
        }
        var subcommand = (args.length == 2) ? args[1] : 'toggle';
        if (subcommand == 'on') {
            this.console.ui.element.classList.add('fullscreen');
        } else if (subcommand == 'off') {
            this.console.ui.element.classList.remove('fullscreen');
        } else if (subcommand == 'toggle') {
            this.console.ui.element.classList.toggle('fullscreen');
        } else {
            return this.usage(response);
        }
    }

    return Fullscreen;
});
