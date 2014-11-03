define([], function () {

    var QUOTE_CHARACTERS = [ '"', "'", '`' ];

    function is_quote(char) {
        for (var q = 0; q < QUOTE_CHARACTERS.length; q++) {
            if (char == QUOTE_CHARACTERS[q]) {
                return true;
            }
        }
        return false;
    }

    // Break command apart into tokens
    return function(command) {
        var token = '';
        var current_quote = undefined;
        var finished = [];

        for (var i = 0; i < command.length; i++) {
            var char = command[i];
            if (current_quote != undefined) {
                if (char == current_quote) {
                    finished.push(token);
                    token = '';
                    current_quote = undefined;
                } else {
                    token = token + char;
                }
            } else if (token == '' && is_quote(char)) {
                current_quote = char;
            } else if (char == ' ' && token) {
                finished.push(token);
                token = '';
            } else {
                token = token + char;
            }
        } // for
        if (token || current_quote) {
            finished.push(token);
        }
        return finished;
    }
});
