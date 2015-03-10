var UIConnectionView = function(delegate) {
    var self = UIElement(delegate);

    // Protected variables
    self._components = undefined;

    // Static attributes
    UIConnectionView.style = {
        margin: 10
    };

    // Private variables
    self._innerRadius = 300;
    self._outerRadius = 310;

    // Render the element
    self.render = function(layer) {
        /*
        if(self.delegate.currentInstanceData == undefined)
            return;
        */

        var components = layer.layerWithName("components");
        var channelTexts = layer.layerWithName("channelTexts");

        if(self.delegate.expanded == false) {
            components.remove();
            channelTexts.remove();
            return;
        }

        var componentsData = applicationModel.getInstanceData("application6","instance1").components;

        var radialLayout = d3.layout.radial()
            .margin(0.2)
            .radius(self._outerRadius)
            .data(componentsData);

        // Create component arcs
        var arc = d3.svg.arc()
            .innerRadius(self._innerRadius)
            .outerRadius(self._outerRadius)
            .startAngle(function(d){return d.startAngle;})
            .endAngle(function(d){return d.endAngle;});

        // Create new component arcs
        components.selectAll("path")
            .data(radialLayout.components)
            .enter()
            .append("path")
            .style("fill", function(d){
                return "#E4F1FE";
            })
            .attr("d", arc);

        // Update component arcs
        components.selectAll("path")
            .data(radialLayout.components)
            .attr("d", arc);

        // Remove component arcs
        components.selectAll("path")
            .data(radialLayout.components)
            .exit()
            .remove();

        // Create new publish channels
        channelTexts.selectAll("text")
            .data(radialLayout.channels)
            .enter()
            .append("text")
            .rotateText()
            .text(function(channel) {return channel.channel;});
    };

    // Constructor
    self.init = function() {
    }();

    // Destructor
    self.deinit = function() {
    };

    return self;
};