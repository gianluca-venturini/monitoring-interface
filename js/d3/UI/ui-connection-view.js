var UIConnectionView = function(delegate) {
    var self = UIElement(delegate);

    // Protected variables
    self._components = undefined;

    // Static attributes
    UIConnectionView.style = {
        margin: 100,
        linkTension: 0.6,
        componentThickness: 10,
        arrow_thick: 11,
        arrow_ratio: 1.5,
    };

    // Private variables
    self._innerRadius = undefined;
    self._outerRadius = undefined;

    // Render the element
    self.render = function() {

        var layer = self._view;

        // Take the width of the screen
        self._innerRadius = Math.min(windowViewController.height, windowViewController.width) / 2 - UIConnectionView.style.margin;
        self._outerRadius = self._innerRadius + UIConnectionView.style.componentThickness;

        var links = layer.layerWithName("links");
        var components = layer.layerWithName("components");
        var channelTexts = layer.layerWithName("channelTexts");

        var componentsData = self.delegate.instanceComponentData;  // applicationModel.getInstanceData("application6","instance1").components;

        if(self.delegate.expanded == false ||
            componentsData == undefined) {
            components.remove();
            channelTexts.remove();
            links.remove();
            return;
        }

        var radialLayout = d3.layout.radial()
            .margin(0.2)
            .radius(self._outerRadius)
            .linkRadius(self._innerRadius)
            .data(componentsData);

        // Create component arc generator
        var arc = d3.svg.arc()
            .innerRadius(self._innerRadius)
            .outerRadius(self._outerRadius)
            .startAngle(function(d){return d.startAngle;})
            .endAngle(function(d){return d.endAngle;});

        // Create component arc generator zero radius
        var arcZeroRadius = d3.svg.arc()
            .innerRadius(0.1)
            .outerRadius(0.1)
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
            .attr("d", arcZeroRadius);

        // Update component arcs
        components.selectAll("path")
            .data(radialLayout.components)
            .transition()
            .delay(Animations.connectionView.CIRCLE_EXPANSION.delay)
            .duration(Animations.connectionView.CIRCLE_EXPANSION.duration)
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
            .fill(self.palette.text.dark)
            .rotateTextZeroAngle()
            .text(function(channel) { return channel.channel; });

        // Update already present text
        channelTexts.selectAll(".channel")
            .data(radialLayout.channels)
            .transition()
            .delay(Animations.connectionView.CIRCLE_EXPANSION.delay)
            .duration(Animations.connectionView.CIRCLE_EXPANSION.duration)
            .rotateText()
            .text(function(channel) {return channel.channel;});

        // Create arg generator utility
        var lineGenerator = d3.svg.line.radial()
            .interpolate("bundle")
            .tension(UIConnectionView.style.linkTension)
            .radius(function(d) { return d.radius; })
            .angle(function(d) { return d.angle; });

        // Create new links between channels
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                    return link.coordinates;
                }))
            .enter()
            .append("path")
            .class("link")
            .class("pointer")
            .opacity(0)
            .attr("class", "link")
            .attr("stroke", self.palette.accent2.bright)
            .attr("d", lineGenerator);

        // Update already present links between
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                return link.coordinates;
            }))
            .transition()
            .delay(Animations.connectionView.LINK_FADE_IN.delay)
            .duration(Animations.connectionView.LINK_FADE_IN.duration)
            .opacity(1)
            .attr("d", lineGenerator);

        // Remove links no more present
        links.selectAll(".link")
            .data(radialLayout.links.map(function(link) {
                return link.coordinates;
            }))
            .exit()
            .transition()
            .duration(Animations.connectionView.LINK_FADE_IN.duration)
            .remove();

        // Create triangles for the subscribed channels
        var arrowData = [
            { "x":  0.0, "y": 0.0},
            { "x":  1*UIConnectionView.style.arrow_thick/UIConnectionView.style.arrow_ratio, "y": 1*UIConnectionView.style.arrow_thick},
            { "x": -1*UIConnectionView.style.arrow_thick/UIConnectionView.style.arrow_ratio, "y": 1*UIConnectionView.style.arrow_thick}
        ];

        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");

        components.selectAll(".subscribeTriangle")
            .data(radialLayout.publishChannels)
            .enter()
            .append("path")
            .class("subscribeTriangle")
            .attr("d", lineFunction(arrowData))
            .attr("fill", self.palette.accent1.dark);

        components.selectAll(".subscribeTriangle")
            .data(radialLayout.publishChannels)
            .transition()
            .duration(Animations.connectionView.ARROW_EXPANSION.duration)
            .rotateLayer();

        components.selectAll(".subscribeTriangle")
            .data(radialLayout.publishChannels)
            .exit()
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