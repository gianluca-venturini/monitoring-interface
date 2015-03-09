(function() {
    d3.selection.prototype.translate = d3.selection.enter.prototype.translate = function(x, y) {
        var self = this;
        return this.attr("transform", function(d) { return "translate(" + (x + self.margin.x) + "," + (y + self.margin.y) + ")"});
    };

    d3.selection.prototype.rotate = d3.selection.enter.prototype.rotate = function(degree, x, y) {
        var self = this;
        if(x != undefined && y != undefined)
            this.attr("transform", function(d) { return "rotate(" + degree + ")"});
        else
            this.attr("transform", function(d) { return "rotate(" + degree + " " + x + "," + y + ")"});

        return this;
    };

    d3.selection.prototype.rotateText = d3.selection.enter.prototype.rotateText = function() {
        var self = this;

        this.attr("text-anchor", function(d) { return d.degree < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.degree < 180 ? null : "rotate(180)"; });

        return this;
    };

    d3.selection.prototype.width = d3.selection.enter.prototype.width = function(width) {
        var self = this;
        return this.attr("width", width);
    };

    d3.selection.prototype.height = d3.selection.enter.prototype.height = function(height) {
        var self = this;
        return this.attr("height", height);
    };

    d3.selection.prototype.margin = d3.selection.enter.prototype.margin = function(margin) {
        this.margin.x = margin;
        this.margin.y = margin;
        return this;
    };

    d3.selection.prototype.newLayer = d3.selection.enter.prototype.newLayer = function() {
        return this.append("g");
    };
})();