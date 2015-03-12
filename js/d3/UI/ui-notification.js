var UINotification = function(delegate, x, y) {
    var self = UIElement(delegate, x, y);

    // Static attributes
    UINotification.style = {
        notificationRadius: 10,
        notificationFontSize: 14,
    };

    // Public attributes
    self.name = undefined;   // Name of the notification

    self.render = function(layer) {

        var notificationGroup = layer.layerWithName("notificationGroup");

        notificationGroup.selectAll(".notificationCircle")
            .data([{}])
            .enter()
            .append("circle")
            .class("notificationCircle")
            .cx(self.x)
            .cy(self.y)
            .r(UINotification.style.notificationRadius)
            .fill(self.palette.accent.normal);

        notificationGroup.selectAll(".notificationText")
            .data([{}])
            .enter()
            .append("text")
            .class("notificationText")
            .attr("text-anchor", "middle")
            .attr("font-size", UINotification.style.notificationFontSize)
            .x(self.x)
            .y(self.y+UINotification.style.notificationFontSize/3)
            .text(delegate.notification(self.name));

        if(delegate.expanded ||
            delegate.notification(self.name) == 0) {

            notificationGroup
                .transition()
                .duration(Animations.notification.NOTIFICATION_FADE_OUT.duration)
                .delay(Animations.notification.NOTIFICATION_FADE_OUT.delay)
                .opacity(0);
        }
        else {
            notificationGroup
                .transition()
                .duration(Animations.notification.NOTIFICATION_FADE_IN.duration)
                .delay(Animations.notification.NOTIFICATION_FADE_IN.delay)
                .opacity(1);
        }

    };

    // Constructor
    self.init = function() {

    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

    };

    return self;
};