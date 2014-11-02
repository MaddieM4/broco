define([], function() {
    // SOmeday, split this out into its own library
    var CODES = {
        'BACKSPACE'  : 8,
        'SPACE'      : 32,
    }
    var EVENTS = ["keyup", "keydown", "keypress", "input"];

    function StringTracker(initial_value, callback) {
        this.callback = callback;
        this.element = this._setup_element(initial_value);
        this.focus();
    }
    StringTracker.prototype._setup_element = function(value) {
        var element = document.createElement('input');
        document.querySelector('body').appendChild(element);
        element.classList.add('broco-hidden-element');
        element.value = value;
        for (var i = 0; i < EVENTS.length; i++) {
            element.addEventListener(EVENTS[i], this.on_update.bind(this));
        }

        return element;
    }

    StringTracker.prototype.focus = function() {
        this.element.focus();
    }
    StringTracker.prototype.blur = function() {
        this.element.blur();
    }
    StringTracker.prototype.has_focus = function() {
        return document.hasFocus() && (document.activeElement == this.element);
    }

    StringTracker.prototype.get_value = function() {
        return this.element.value;
    }
    StringTracker.prototype.get_position = function() {
        this.focus();
        return this.element.selectionStart;
    }
    StringTracker.prototype.on_update = function() {
        this.callback(this);
    }

    return StringTracker;
});
