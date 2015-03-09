var UIConnectionView = function(layer) {
    var self = UIElement(layer);

    // Protected variables
    self._components = undefined;

    // Static attributes
    UIConnectionView.style = {
        margin: 10
    };

    // Public variables
    self.data = undefined;

    // Private variables
    self._innerRadius = 100;
    self._outerRadius = 110;

    // Render the element
    self.render = function() {
        if(self.data == undefined)
            return;

        var radialLayout = d3.layout.radial()
            .margin(0.2)
            .radius(self._outerRadius)
            .data(self.data);

        // Create component arcs
        var arc = d3.svg.arc()
            .innerRadius(self._innerRadius)
            .outerRadius(self._outerRadius)
            .startAngle(function(d){return d.startAngle;})
            .endAngle(function(d){return d.endAngle;});

        // Create new component arcs
        self._components.selectAll("path")
            .data(radialLayout.components)
            .enter()
            .append("path")
            .style("fill", function(d){
                return "#AABBCC";
            })
            .attr("d", arc);

        // Update component arcs
        self._components.selectAll("path")
            .data(radialLayout.components)
            .attr("d", arc);

        // Remove component arcs
        self._components.selectAll("path")
            .data(radialLayout.components)
            .exit()
            .remove();

        // Create new publish channels
        self._channel.selectAll("text")
            .data(radialLayout.channels)
            .enter()
            .append("text")
            //.rotateText()
            .text(function(channel) {return channel.channel;});
    };

    // Constructor
    self.init = function() {
        self._components = self._layer.newLayer();
        self._channel = self._layer.newLayer();
    }();

    // Destructor
    self.deinit = function() {
        self._components.remove();
        self._channel.remove();
        self._layer.remove();
    };

    return self;
};