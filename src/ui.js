define([], function() {

    function newClassDiv(classname) {
        var div = document.createElement('div');
        div.classList.add(classname);
        return div;
    }

    // BrocoPrompt ================================================
    function BrocoPrompt() {
        this.element = newClassDiv('broco-prompt');
        this.text_element = document.createTextNode('');

        var contained = newClassDiv('broco-prompt-text');
        contained.appendChild(this.text_element)
        this.element.appendChild(contained);

        this.prompt_string = '$> ';
        this.value = '';
        this.display();
    }
    BrocoPrompt.prototype.display = function() {
        this.text_element.nodeValue = this.prompt_string + this.value;
    }

    // BrocoUI ====================================================
    function BrocoUI(selector) {
        this.element = document.querySelector(selector);
        this.element.classList.add('broco-console');

        this.entries = newClassDiv('broco-entries');
        this.element.appendChild(this.entries);

        this.prompt = new BrocoPrompt();
        this.element.appendChild(this.prompt.element);

        this.append(this.domCommand("demo command"));
    }
    BrocoUI.prototype.domCommand = function(command_string) {
        var div = newClassDiv('broco-entry-command');
        var text = document.createTextNode(command_string);

        div.appendChild(text);
        return div;
    }
    BrocoUI.prototype.append = function(element) {
        this.entries.appendChild(element);
    }

    return BrocoUI;
});
