var UITab = function(delegate, index) {
    var self = UIElement(delegate);


    UITab.style = {
        maxHeight: 100,
        width: 200,
        delay: 500
    };

    self.render = function(layer) {
        layer.selectAll(".instanceTab")
            .data([{}])
            .enter()
            .append("rect")
            .class("instanceTab")
            .class("pointer")
            .x(self.getLeftParent() - 400)
            .on("mouseover", function () {
                if (!delegate.selected()) {
                    d3.select(this).fill(self.palette.accent.bright);
                }
            })
            .on("mouseout", function () {
                d3.select(this).fill(self.getTabColor());
            })
            .on("click", function () {
                self.delegate.clicked();
            })
            .fill(self.getTabColor());

        layer.selectAll(".instanceTabText")
            .data([{}])
            .enter()
            .append("text")
            .class("pointer")
            .class("instanceTabText")
            .class("no_interaction")
            .x(self.getLeftParent()-400);

        if(self.delegate.parentApplicationViewController.expanded) {
            layer.selectAll(".instanceTab")
                .transition()
                .delay(UITab.style.delay)
                .width(UITab.style.width)
                .height(self.getTabHeight())
                .x(self.getLeftParent())
                .y(self.getTopParent() + index * self.getTabHeight() + UIApplication.style.titleBarHeight);

            layer.selectAll(".instanceTabText")
                .transition()
                .delay(UITab.style.delay)
                .x(self.getLeftParent() + UITab.style.width/2)
                .y(self.getTopParent() + index * self.getTabHeight() + UIApplication.style.titleBarHeight + self.getTabHeight()/2)
                .attr("text-anchor", "middle")
                .text(self.delegate.name);
        }
        else {
            layer.selectAll(".instanceTab")
                .data([])
                .exit()
                .remove();

            layer.selectAll(".instanceTabText")
                .data([])
                .exit()
                .remove();
        }
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
        return windowViewController.height - 2 * UIApplication.style.margin - UIApplication.style.titleBarHeight;
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