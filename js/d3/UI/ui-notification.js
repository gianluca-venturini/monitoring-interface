var UINotification = function(delegate) {
    var self = UIElement(delegate);

    // Static attributes
    UINotification.style = {
        notificationRadius: 10,
        notificationFontSize: 14,
    };

    // Public attributes
    self.name = undefined;   // Name of the notification

    self.render = function() {

        var layer = self._view;

        var notificationGroup = layer.layerWithName("notificationGroup");

        if(self.show == false) {
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

        notificationGroup.selectAll(".notificationCircle")
            .data([{}])
            .enter()
            .append("circle")
            .class("notificationCircle")
            .cx(self.x)
            .cy(self.y)
            .r(UINotification.style.notificationRadius)
            .fill(self.palette.accent.dark);

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