define(['broco/ui/util', 'broco/ui/stringtracker'], function(util, StringTracker) {

    var CURSOR_CHAR = '▓';

    function BrocoPrompt(on_submit) {
        this.element = util.newClassDiv('broco-prompt');
        this.text_element = document.createTextNode('');

        var contained = util.newClassDiv('broco-prompt-text');
        contained.appendChild(this.text_element)
        this.element.appendChild(contained);

        this.prompt_string = '$> ';
        this.tracker = new StringTracker('', this.on_change.bind(this), on_submit);
        this.element.addEventListener("click", this.tracker.focus.bind(this.tracker));

        this.reset_blink_timer();
        this.display();
    }
    BrocoPrompt.prototype.display = function() {
        var value = this.tracker.get_value();
        if (this.blink_state || !this.tracker.has_focus()) {
            var pos = this.tracker.get_position();
            if (pos == value.length) {
                value = value + CURSOR_CHAR;
            } else {
                value = value.substr(0, pos) + CURSOR_CHAR + value.substr(pos + 1);
            }
        }
        this.text_element.nodeValue = this.prompt_string + value;
    }
    BrocoPrompt.prototype.on_blink = function() {
        this.blink_state = !this.blink_state;
        this.display();
    }
    BrocoPrompt.prototype.on_change = function() {
        this.reset_blink_timer();
        this.display();
    }
    BrocoPrompt.prototype.reset_blink_timer = function() {
        if (this.blink_timer != undefined) {
            clearInterval(this.blink_timer);
        }
        this.blink_timer = setInterval(this.on_blink.bind(this), 500);
        this.blink_state = true;
    }

    return BrocoPrompt;
});
