var UITab = function(delegate, name) {
    var self = UIElement(delegate);

    UITab.style = {
        height: 100,
        width: 200
    };

    // Public variables
    self.name = undefined;


    // Private variables
    var instanceTab = undefined;
    var instanceTabText = undefined;

    self.render = function() {

        console.log("Render: tab "+name+" "+delegate.parentApplicationViewController.name);

        var layer = self.view;

        // Tab background
        if(instanceTab == undefined) {
            instanceTab = layer.append("rect")
                .class("instanceTab")
                .class("pointer")
                .x(-UITab.style.width / 2)
                .y(-UITab.style.height / 2)
                .margin(undefined)
                .width(0)
                .height(UITab.style.height)
                .on("mouseover", function () {
                    if (!delegate.selected) {
                        d3.select(this).fill(self.palette.accent1.bright);
                    }
                })
                .on("mouseout", function () {
                    d3.select(this).fill(self.getTabColor());
                })
                .on("click", function () {
                    self.delegate.clicked();
                })
                .fill(self.getTabColor());
        }

        // Tab text
        if(instanceTabText == undefined) {

            instanceTabText = layer
                .append("text")
                .class("pointer")
                .class("instanceTabText")
                .class("no_interaction")
                .attr("text-anchor", "middle")
                .x(-UITab.style.width / 2)
                .fill(self.palette.text.bright);
        }

        if(self.delegate.parentApplicationViewController.expanded) {

            // Tab background
            instanceTab
                .transition()
                .duration(Animations.instance.INSTANCE_ENTER.duration)
                .delay(Animations.instance.INSTANCE_ENTER.delay)
                .margin(undefined)
                .width(UITab.style.width)
                .fill(self.getTabColor())
                .opacity(1);

            // Tab text
            instanceTabText
                .transition()
                .duration(Animations.instance.INSTANCE_ENTER.duration)
                .delay(Animations.instance.INSTANCE_ENTER.delay)
                .x(0)
                .opacity(1)
                .text(name);
        }
        else {

            // Tab background
            instanceTab
                .transition()
                .duration(Animations.instance.INSTANCE_EXIT.duration)
                .delay(Animations.instance.INSTANCE_EXIT.delay)
                .margin(undefined)
                .width(0)
                .opacity(0);

            // Tab text
            instanceTabText
                .data([{}])
                .x(-UITab.style.width / 2)
                .opacity(0);
        }
    };

    self.getTabHeight = function() {
        return Math.min(UITab.style.maxHeight, self.getParentHeight()/delegate.getTabsNumber());
    };

    self.getTabColor = function() {
        var color;
        if(delegate.selected) {
            color = self.palette.accent1.dark;
        }
        else {
            color = self.palette.accent1.normal;
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
        self.name = name;
    }();

    // Destructor
    self.deinit = function() {
    };

    return self;

};