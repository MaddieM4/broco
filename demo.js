require.config({
    paths: {
        'broco': 'src'
    }
});

define(['broco/ui'], function(ui) {
    broco = new ui('#console');
    broco.prompt.value = "Living ship";
    broco.prompt.display();
});
