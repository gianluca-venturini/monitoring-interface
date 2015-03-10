(function() {
    d3.layout.radial = function() {

        // Private variables
        this._numChannels = undefined;
        this._numComponents = undefined;

        this._margin = 0;            // Margin between components in %
        this._radius = undefined;

        // Public variables
        this.components = undefined;
        this.channels = undefined;

        this.data = function(components) {
            var self = this;

            this.components = [];
            this.channels = [];

            this._numComponents = components.length;
            var numChannels = 0;

            // Clone components and calculate number of channels
            components.forEach(function(component) {
                numChannels += component.publish.length;
                numChannels += component.subscribe.length;
                numChannels += component.request.length;
                numChannels += component.handle_request.length;

                self.components.push(component);
            });

            this._numChannels = numChannels;

            // Calculate angle of components
            var angle = 0;
            this.components.forEach(function(component) {
                var numChannels = 0;
                numChannels += component.publish.length;
                numChannels += component.subscribe.length;
                numChannels += component.request.length;
                numChannels += component.handle_request.length;

                var angleMargin = 2 * Math.PI * self._margin / self._numComponents;

                component.startAngle = angle;
                component.endAngle = angle + numChannels * 2 * Math.PI * (1.0 - self._margin) / self._numChannels;

                angle = component.endAngle + angleMargin;

                // Calculate angle for every channel
                var deltaAngle = (component.endAngle - component.startAngle) / numChannels;
                var channelAngle = component.startAngle + deltaAngle / 2.0;
                component.publish.forEach(function(publish) {
                    publish.angle = channelAngle;
                    publish.radius = self._radius;
                    channelAngle += deltaAngle;

                    self.channels.push(publish);
                });
                component.subscribe.forEach(function(publish) {
                    publish.angle = channelAngle;
                    publish.radius = self._radius;
                    channelAngle += deltaAngle;

                    self.channels.push(publish);
                });
                component.request.forEach(function(publish) {
                    publish.angle = channelAngle;
                    publish.radius = self._radius;
                    channelAngle += deltaAngle;

                    self.channels.push(publish);
                });
                component.handle_request.forEach(function(publish) {
                    publish.angle = channelAngle;
                    publish.radius = self._radius;
                    channelAngle += deltaAngle;

                    self.channels.push(publish);
                });
            });

            return this;
        };

        this.margin = function(margin) {
            if(margin == undefined)
                return this._margin;

            this._margin = margin;
            return this;
        };

        this.radius = function(radius) {
            if(radius == undefined)
                return this._radius;

            this._radius = radius;
            return this;
        };

        return this;
    };
})();