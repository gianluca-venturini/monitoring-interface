(function() {
    d3.selection.prototype.tabTable = d3.selection.enter.prototype.tabTable = function() {

        this.lineHeight = function(height) {
            this.lineHeight = height;
            return this;
        };

        return this;
    };
})();