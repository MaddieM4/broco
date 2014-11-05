define([], function() {

    function Traversal(parent, key) {
        this.parent = parent;
        this.key = key;
    }
    Traversal.prototype.step = function(key) {
        var new_parent = this.parent[this.key];
        return new Traversal(new_parent, key);
    }
    Traversal.prototype.navigate = function(navigation) {
        var steps = navigation.split('.');
        var current = this;
        for (var i = 0; i < steps.length; i++) {
            current = current.step(steps[i]);
        }
        return current;
    }
    Traversal.prototype.get = function() {
        return this.parent[this.key];
    }
    Traversal.prototype.set = function(value) {
        this.parent[this.key] = value;
    }

    return Traversal;
});
