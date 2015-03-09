(function() {
    d3.layout.radial = function() {

        // Private variables
        this.numChannels = undefined;
        this.numComponents = undefined;

        this.margin = undefined;    // Margin between components in %
        this.radius = undefined;    // Radius of the component circle

        this.components = function(components) {
            var self = this;

            this.components = components;

            this.numComponents = components.length;
            var numChannels = 0;

            components.forEach(function(component) {
                numChannels += component.publish.length;
                numChannels += component.subscribe.length;
                numChannels += component.request.length;
                numChannels += component.handle_request.length;
            });

            this.numChannels = numChannels;

            console.log(this.numChannels);
            console.log(this.numComponents);

            // Calculate angle of components
            var angle = 0;
            components.forEach(function(component) {
                var numChannels = 0;
                numChannels += component.publish.length;
                numChannels += component.subscribe.length;
                numChannels += component.request.length;
                numChannels += component.handle_request.length;

                component.startAngle = angle;
                component.endAngle = angle * numChannels * self.numChannels;
            });

            return this;
        };

        this.margin = function(margin) {
            this.margin = margin;
        };

        return this;
    };
})();