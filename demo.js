require.config({
    paths: {
        'broco': 'src'
    }
});

define(['broco/console', 'broco/ui/core'], function(BrocoConsole, BrocoUI) {
    var console = new BrocoConsole();
    ui = new BrocoUI('#console', console);
    ui.process('motd');
});
