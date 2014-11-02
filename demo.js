require.config({
    paths: {
        'broco': 'src'
    }
});

define(['broco/console', 'broco/ui/core'], function(BrocoConsole, BrocoUI) {
    var console = new BrocoConsole();
    var ui = new BrocoUI('#console', console);
    console.depend('broco/modules/', ['motd'], function() {
        ui.process('motd');
    });
});
