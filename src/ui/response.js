define(['broco/ui/util'], function(util) {

    function BrocoUIResponse() {
        this.element = util.newClassDiv('broco-entry-response');
    }
    BrocoUIResponse.prototype.append = function(element) {
        this.element.appendChild(element);
        return this;
    }
    BrocoUIResponse.prototype.print = function(value, classes) {
        if (typeof value != "string") {
            value = JSON.stringify(value);
        }
        var div = util.newClassDiv('broco-entry-response-line');
        var text = document.createTextNode(value);
        div.appendChild(text);

        if (!classes) classes = [];
        for (var c = 0; c < classes.length; c++) {
            div.classList.add(classes[c]);
        }
        
        this.append(div);
        return this;
    }
    // Print an array of lines
    BrocoUIResponse.prototype.print_n = function(values, classes) {
        for (var i = 0; i < values.length; i++) {
            this.print(values[i], classes);
        }
        return this;
    }
    // Split by \n
    BrocoUIResponse.prototype.print_split = function(value, classes) {
        return this.print_n(value.split("\n"));
    }

    return BrocoUIResponse;
});
