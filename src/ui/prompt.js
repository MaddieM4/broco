define(['broco/ui/util'], function(util) {

    function BrocoPrompt() {
        this.element = util.newClassDiv('broco-prompt');
        this.text_element = document.createTextNode('');

        var contained = util.newClassDiv('broco-prompt-text');
        contained.appendChild(this.text_element)
        this.element.appendChild(contained);

        this.prompt_string = '$> ';
        this.value = '';
        this.display();
    }
    BrocoPrompt.prototype.display = function() {
        this.text_element.nodeValue = this.prompt_string + this.value;
    }

    return BrocoPrompt;
});
