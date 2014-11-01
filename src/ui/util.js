define([], function() {
    return {
        "newClassDiv": function(classname) {
            var div = document.createElement('div');
            div.classList.add(classname);
            return div;
        }
    }
});
