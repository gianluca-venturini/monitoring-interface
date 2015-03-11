var UITab = function(delegate, index) {
    var self = UIElement(delegate);


    UITab.style = {
        maxHeight: 100,
        width: 200,
        delay: 500
    };

    // Private variables
    var rect = undefined;



    self.render = function(layer) {
        rect = layer.append("rect");

        rect
            .x(self.getLeftParent() - 400)
            .on("mouseover", function() {
                if(!delegate.selected()) {
                    d3.select(this).fill(self.palette.accent.bright);
                }
            })
            .on("mouseout", function() {
                d3.select(this).fill(self.getTabColor());
            })
            .on("click", function() {
                self.delegate.clicked();
            })
            .fill(self.getTabColor())
            .transition()
            .delay(UITab.style.delay)
            .width(UITab.style.width)
            .height(self.getTabHeight())
            .x(self.getLeftParent())
            .y(self.getTopParent() + index * self.getTabHeight() + UIApplication.style.titleBarHeight);

        layer
            .append("text")
            .x(self.getLeftParent()-400)
            //.x(UITab.style.outScreen)
            .transition()
            .delay(UITab.style.delay)
            .x(self.getLeftParent() + UITab.style.width/2)
            .y(self.getTopParent() + index * self.getTabHeight() + UIApplication.style.titleBarHeight + self.getTabHeight()/2)
            .attr("text-anchor", "middle")
            .text(self.delegate.name);
    };

    self.updateColor = function() {
        rect.fill(self.getTabColor());
    };

    self.getTabHeight = function() {
        return Math.min(UITab.style.maxHeight, self.getParentHeight()/delegate.getTabsNumber());
    };

    self.getTabColor = function() {
        var color;
        if(delegate.selected()) {
            color = self.palette.accent.dark;
        }
        else {
            color = self.palette.accent.normal;
        }
        return color;
    };

    self.getTopParent = function() {
        return -windowViewController.height / 2 + UIApplication.style.margin;
    };

    self.getLeftParent = function() {
        return -windowViewController.width / 2 + UIApplication.style.margin;
    };

    self.getParentHeight = function() {
        return windowViewController.height - 2 * UIApplication.style.margin;
    };
    self.getParentWidth = function() {
        return windowViewController.width - 2 * UIApplication.style.margin;
    };


    // Constructor
    self.init = function() {
        notificationCenter.subscribe(Notifications.ui.INSTANCE_CLICKED, function() {
            self.updateColor();
        });
    }();

    // Destructor
    self.deinit = function() {
        // TODO?
    };

    return self;

};