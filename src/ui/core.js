define(['broco/ui/util', 'broco/ui/prompt'], function(util, BrocoPrompt) {

    function BrocoUI(selector) {
        this.element = document.querySelector(selector);
        this.element.classList.add('broco-console');

        this.entries = util.newClassDiv('broco-entries');
        this.element.appendChild(this.entries);

        this.prompt = new BrocoPrompt(this.on_submit.bind(this));
        this.element.appendChild(this.prompt.element);
    }
    BrocoUI.prototype.domCommand = function(command_string) {
        var div = util.newClassDiv('broco-entry-command');
        var text = document.createTextNode(command_string);

        div.appendChild(text);
        return div;
    }
    BrocoUI.prototype.append = function(element) {
        this.entries.appendChild(element);
    }
    BrocoUI.prototype.on_submit = function(st) {
        var value = st.get_value();
        st.clear();
        if (value != '') {
            this.append(this.domCommand(this.prompt.prompt_string + value));
        }
    }

    return BrocoUI;
});
