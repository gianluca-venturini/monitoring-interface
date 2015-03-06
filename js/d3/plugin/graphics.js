(function() {
    d3.selection.prototype.translate = d3.selection.enter.prototype.translate = function(x, y) {
        var self = this;
        return this.attr("transform", function(d) { return "translate(" + (x + self.margin.x) + "," + (y + self.margin.y) + ")"});
    };

    d3.selection.prototype.margin = d3.selection.enter.prototype.margin = function(margin) {
        this.margin.x = margin;
        this.margin.y = margin;
        return this;
    };
})();