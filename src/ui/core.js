define(['broco/ui/util', 'broco/ui/prompt', 'broco/ui/response'],
function(util, BrocoPrompt, Response) {

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
    BrocoUI.prototype.append = function(element) {
        this.entries.appendChild(element);
    }
    BrocoUI.prototype.appendCommand = function(value) {
        this.append(this.domCommand(value));
    }
    BrocoUI.prototype.process = function(command) {
        var response = new Response();
        this.appendCommand(this.prompt.prompt_string + command);
        this.console.process(command, response);
        this.append(response.element);
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
