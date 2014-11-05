require.config({
    paths: {
        'broco': 'src'
    }
});

define(['broco/logic/console', 'broco/ui/core', 'vendor/domReady!'], function(BrocoConsole, BrocoUI) {
    var console = new BrocoConsole();
    var ui = new BrocoUI('#console', console);
    console.depend('broco/modules/', ['motd','load','help'], function() {
        console.modules.help.tutorials.getting_started = [
            'You can load modules at run-time. Try this:',
            '$> load broco/modules fullscreen',
            'Now you have access to the `fullscreen` module. Give it a try!',
            '$> fullscreen',
            'Modules are just commands. Most projects using broco for their own purposes, will provide their own modules.'
        ];
        ui.process('motd');
    });
});
