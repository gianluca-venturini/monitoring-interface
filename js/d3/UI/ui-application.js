var UIApplication = function(layer) {
    var self = {};

    // Protected variables
    self._layer = undefined;

    // Public variables
    self.data = undefined;

    self.render = function() {
        self._layer.append("rect")
            .attr("fill", "steelblue")
            .attr("width", "100")
            .attr("height", "100")
            .attr("x", "0")
            .attr("y", "0");

        self._layer.append("text")
            .attr("x", 50)
            .attr("y", 50)
            .attr("text-anchor", "middle")
            .text(self.data.name);
    };

    // Constructor
    self.init = function() {
        self._layer = layer;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

        console.log("Deinit");
    };

    return self;
};