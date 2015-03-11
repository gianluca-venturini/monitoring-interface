var UIApplication = function(delegate) {
    var self = UIElement(delegate);

    // Static attributes
    UIApplication.style = {
        margin: 10,
        titleBarHeight: 50
    };

    // Private

    // Public variables
    self.data = undefined;
    self.expanded = false;

    self.render = function(layer) {

        // Background rect
        layer.selectAll(".applicationBackground")
            .data([{}])
            .enter()
            .append("rect")
            .class("applicationBackground")
            .fill(self.palette.primary.normal)
            .class("pointer")
            .on("click", function() {
                delegate.clicked();
            });

        if(self.delegate.expanded) {
            layer.selectAll(".applicationBackground")
                .transition()
                .delay(Animations.application.APPLICATION_EXPANSION.delay)
                .duration(Animations.application.APPLICATION_EXPANSION.duration)
                .fill(self.palette.primary.normal)
                .margin(UIApplication.style.margin)
                .width(windowViewController.width)
                .height(windowViewController.height)
                .x(-windowViewController.width / 2 + UIApplication.style.margin)
                .y(-windowViewController.height / 2 + UIApplication.style.margin);
        }
        else {
            layer.selectAll(".applicationBackground")
                .transition()
                .delay(Animations.application.APPLICATION_REDUCTION.delay)
                .duration(Animations.application.APPLICATION_REDUCTION.duration)
                .fill(self.palette.primary.normal)
                .margin(undefined)
                .width(100)
                .height(100)
                .x(-50)
                .y(-50);
        }

        // Application name
        layer.selectAll(".name")
            .data([{}])
            .enter()
            .append("text")
            .class("name")
            .class("pointer")
            .class("no_interaction")
            .attr("text-anchor", "middle")
            .text(delegate.name);

        // Application name
        if(self.delegate.expanded) {
            layer.selectAll(".name")
                .transition()
                .duration(1000)
                .x(0)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 20);
        }
        else {
            layer.selectAll(".name")
                .transition()
                .x(0)
                .y(0);
        }


        layer.selectAll(".name")
            .text(delegate.name);

    };

    self.instanceData = function(selectedInstance) {
        var d = self.data.instances.filter(function(d) {
            return d.name == selectedInstance
        });

        if(d.count == 0)
            return undefined;

        return d[0];
    };

    self.getWidth = function() {
        return width  - UIApplication.style.margin * 2;
    };

    self.getHeight = function() {
        return height - UIApplication.style.margin * 2;
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