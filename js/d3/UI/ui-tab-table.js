var UITabTable = function(layer) {
    var self = UIElement(layer);

    // Public variables
    self.data = undefined;

    // Render the element
    self.render = function() {
        if(self.data != undefined) {
            self._layer.selectAll("rect")
                .data(self.data)
                .enter()
                .tabTable()
                .lineHeight(50)
                .append("rect")
                .attr("width", "200")
                .attr("height", "50")
                .attr("x", function(d) { return 200; })
                .attr("y", function(d,i) { return i*50;  })
                .attr("fill", "#e74c3c");

        }
    };

    // Constructor
    self.init = function() {
        self._layer = layer;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    }

    return self;

};