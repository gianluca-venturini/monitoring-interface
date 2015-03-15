var UIApplication = function(delegate) {
    var self = UIElement(delegate);

    // Static attributes
    UIApplication.style = {
        margin: 10,
        titleBarHeight: 50,
        applicationBackgroundWidthNotExpanded: 100,
        applicationBackgroundHeightNotExpanded: 100,
        headerRectHeightNotExpanded: 10,
        headerRectHeightExpanded: 30,
        activeStatusColor: defaultPalette.state.green,
        disabledStatusColor: defaultPalette.state.red
    };

    // Private

    // Public variables
    self.data = undefined;
    self.expanded = false;

    self.statusColor = function() {
      if(self.delegate.status)
        return UIApplication.style.activeStatusColor;

        return UIApplication.style.disabledStatusColor;
    };

    self.render = function() {

        var layer = self.view;

        // Background rect
        layer.selectAll(".applicationBackground")
            .data([{}])
            .enter()
            .append("rect")
            .on("mouseover", function() {
                d3.select(this).fill(self.palette.accent1.bright);
            })
            .on("mouseout", function() {
                d3.select(this).fill(self.palette.accent1.normal);
            })
            .fill(self.palette.primary.normal)
            .class("applicationBackground");

        if(self.delegate.expanded) {
            layer.selectAll(".applicationBackground")
                .classRemove("pointer")
                .on("click", null)
                .on("mouseover", null)
                .on("mouseout", null)
                .transition()
                .fill(self.palette.background.dark)
                .margin(UIApplication.style.margin)
                .width(windowViewController.width)
                .height(windowViewController.height)
                .x(-windowViewController.width / 2 + UIApplication.style.margin)
                .y(-windowViewController.height / 2 + UIApplication.style.margin);
        }
        else {
            layer.selectAll(".applicationBackground")
                .class("pointer")
                .on("click", function() {
                    delegate.clicked();
                })
                .on("mouseover", function() {
                    d3.select(this).fill(self.palette.accent1.bright);
                })
                .on("mouseout", function() {
                    d3.select(this).fill(self.palette.accent1.normal);
                })
                .transition()
                .fill(self.palette.accent1.normal)
                .margin(undefined)
                .width(UIApplication.style.applicationBackgroundWidthNotExpanded)
                .height(UIApplication.style.applicationBackgroundHeightNotExpanded)
                .x(-50)
                .y(-50);
        }

        // Application name group
        nameGroup = layer.selectAll(".nameGroup")
            .data([{}])
            .enter()
            .append("g")
            .class("nameGroup");

        // Create the status rect
        nameGroup.append("rect")
            .class("no_interaction")
            .class("headerRect");

        // Update the status rect
        layer.selectAll(".headerRect")
            .fill(self.statusColor());

        nameGroup.append("text")
            .class("name")
            .class("pointer")
            .class("no_interaction")
            .attr("text-anchor", "middle")
            .fill(self.palette.text.bright)
            .text(delegate.name);

        // add close button
        nameGroup.append("svg:image")
            .attr('width', 20)
            .attr('height', 20)
            .attr("xlink:href","img/cross_red_border_white.svg")
            .class("closeApp")
            .class("pointer")
            .style("opacity", 0)
            .on("click", function() {
                delegate.closeButtonClicked();
            });

        // Application name
        if(self.delegate.expanded) {
            // move the name
            layer.selectAll(".nameGroup").selectAll(".name")
                .transition()
                .duration(Animations.application.APPLICATION_EXPANSION.duration)
                .x(0)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 20);

            // move the rect
            layer.selectAll(".nameGroup").selectAll(".headerRect")
                .transition()
                .x(-windowViewController.width / 2 + UIApplication.style.margin )
                .y(-windowViewController.height / 2 + UIApplication.style.margin)
                .attr('width', windowViewController.width - UIApplication.style.margin * 2)
                .transition()
                .attr('height', UIApplication.style.headerRectHeightExpanded)
                .transition()
                ;

            // move close button
            layer.selectAll(".nameGroup").selectAll(".closeApp")
                .on("mouseover", function() {
                    d3.select(this).attr("xlink:href","img/cross_red_border_white_mouseover.svg");
                })
                .on("mouseout", function() {
                    d3.select(this).attr("xlink:href","img/cross_red_border_white.svg");
                })
                .transition()
                .x(windowViewController.width / 2 - UIApplication.style.margin - 25)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 5)
                .attr("xlink:href","img/cross_red_border_white.svg")
                .transition()
                .delay(750)
                .style("opacity", 1);

        }
        else {
            layer.selectAll(".nameGroup").selectAll(".name")
                .transition()
                .x(0)
                .y(0);

            layer.selectAll(".nameGroup").selectAll(".headerRect")
                .transition()
                .attr('width', UIApplication.style.applicationBackgroundWidthNotExpanded)
                .attr('height', UIApplication.style.headerRectHeightNotExpanded)
                .x(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2)
                .y(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2);

            layer.selectAll(".nameGroup").selectAll(".closeApp")
                .on("mouseover", null)
                .on("mouseout", null)
                .x(0)
                .y(0)
                .style("opacity", 0);
        }

        layer.selectAll(".nameGroup").selectAll(".name")
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