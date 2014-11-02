require.config({
    paths: {
        'broco': 'src'
    }
});

define(['broco/ui/core'], function(ui) {
    broco = new ui('#console');
});
