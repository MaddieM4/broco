define(['broco/ui/util', 'broco/ui/prompt'], function(util, BrocoPrompt) {

    function BrocoUI(selector, console) {
        this.element = document.querySelector(selector);
        this.element.classList.add('broco-console');

        this.entries = util.newClassDiv('broco-entries');
        this.element.appendChild(this.entries);

        this.console = console;
        this.prompt = new BrocoPrompt(this.on_submit.bind(this));
        this.element.appendChild(this.prompt.element);
    }
    BrocoUI.prototype.domCommand = function(command_string) {
        var div = util.newClassDiv('broco-entry-command');
        var text = document.createTextNode(command_string);

        div.appendChild(text);
        return div;
    }
    BrocoUI.prototype.domResponse = function(response_object) {
        var response_div = util.newClassDiv('broco-entry-response');
        for (var l = 0; l < response_object.lines.length; l++) {
            var line = response_object.lines[l];
            var div = util.newClassDiv('broco-entry-response-line');
            if (typeof line == "string") {
                var text = document.createTextNode(line);
                div.appendChild(text);
            } else {
                dev.appendChild(line);
            }
            response_div.appendChild(div);
        }
        return response_div;
    }
    BrocoUI.prototype.append = function(element) {
        this.entries.appendChild(element);
    }
    BrocoUI.prototype.appendCommand = function(value) {
        this.append(this.domCommand(value));
    }
    BrocoUI.prototype.appendResponse = function(value) {
        this.append(this.domResponse(value));
    }
    BrocoUI.prototype.process = function(command) {
        this.appendCommand(this.prompt.prompt_string + command);
        this.appendResponse(this.console.process(command));
    }
    BrocoUI.prototype.on_submit = function(st) {
        var value = st.get_value();
        st.clear();
        this.element.scrollTop = this.element.scrollHeight;
        if (value != '') {
            this.process(value);
        }
    }

    return BrocoUI;
});
