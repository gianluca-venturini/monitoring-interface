var UIConnectionView = function(delegate) {
    var self = UIElement(delegate);

    // Protected variables
    self._components = undefined;

    // Static attributes
    UIConnectionView.style = {
        margin: 10,
        linkTension: 0.6
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
        var links = layer.layerWithName("links");

        if(self.delegate.expanded == false) {
            components.remove();
            channelTexts.remove();
            links.remove();
            return;
        }

        var componentsData = applicationModel.getInstanceData("application6","instance1").components;

        var radialLayout = d3.layout.radial()
            .margin(0.2)
            .radius(self._outerRadius)
            .linkRadius(self._innerRadius)
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
        channelTexts.selectAll(".channel")
            .data(radialLayout.channels)
            .enter()
            .append("text")
            .class("channel")
            .rotateText()
            .text(function(channel) {return channel.channel;});

        // Update already present text
        channelTexts.selectAll(".channel")
            .data(radialLayout.channels)
            .rotateText()
            .text(function(channel) {return channel.channel;});

        // Create arg generator utility
        var lineGenerator = d3.svg.line.radial()
            .interpolate("bundle")
            // TODO: .tension(UIConnectionView.style.linkTension)
            .tension(0.6)
            .radius(function(d) { return d.radius; })
            .angle(function(d) { return d.angle; });

        // Create new links between channels
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                    return [link.coordinates[0],
                            link.coordinates[0],
                            link.coordinates[0]];
                }))
            .enter()
            .append("path")
            .class("link")
            .class("pointer")
            .attr("class", "link")
            .attr("d", lineGenerator);

        // Update already present links between
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                return link.coordinates;
            }))
            .transition()
            .delay(1000)
            .duration(1500)
            .attr("d", lineGenerator);

        // Remove links no more present
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                return [link.coordinates[1],
                    link.coordinates[1],
                    link.coordinates[1]];
            }))
            .exit()
            .transition()
            .duration(1500)
            .attr("d", lineGenerator)
            .remove();


    };

    // Constructor
    self.init = function() {
    }();

    // Destructor
    self.deinit = function() {
    };

    return self;
};