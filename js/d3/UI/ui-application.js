var UIApplication = function(layer) {
    var self = {};

    // Protected variables
    self._layer = undefined;

    self.render = function() {
        self._layer.append("rect")
            .attr("fill", "steelblue")
            .attr("width", "100")
            .attr("height", "100")
            .attr("x", "0")
            .attr("y", "0");
    };

    self.init = function() {
        self._layer = layer;
    }();

    return self;
};