var UIApplication = function(delegate) {
    var self = UIElement(delegate);

    // Static attributes
    UIApplication.style = {
        margin: 10,
        titleBarHeight: 50,
        applicationBackgroundWidthNotExpanded: 100,
        applicationBackgroundHeightNotExpanded: 100,
        optionRectHeight: 50,
        headerRectHeightNotExpanded: 10,
        headerRectHeightExpanded: 30,
        activeStatusColor: defaultPalette.state.green,
        disabledStatusColor: defaultPalette.state.red
    };

    // Public variables
    self.data = undefined;
    self.expanded = false;

    self.statusColor = function() {
      if(self.delegate.status)
        return UIApplication.style.activeStatusColor;

        return UIApplication.style.disabledStatusColor;
    };

    self.openOptionRect = function (backGroundRect) {
        backGroundRect
            .transition()
            .style("opacity", 1);
    };

    self.closeOptionRect = function (backGroundRect) {
        backGroundRect
            .transition()
            .style("opacity", 0);
    };

    // Private variables
    var applicationBackground = undefined;
    var nameGroup = undefined;
    var optionRect = undefined;
    var headerRect = undefined;
    var appName = undefined;
    var closeIcon = undefined;

    self.render = function() {

        console.log("Render: application");

        var layer = self.view;

        // Background rect
        if(applicationBackground == undefined) {
            applicationBackground = layer.append("rect")
                .on("mouseover", function () {
                    d3.select(this).fill(self.palette.accent1.bright);
                    self.openOptionRect(optionRect);
                })
                .on("mouseout", function () {
                    d3.select(this).fill(self.palette.accent1.normal);
                    self.closeOptionRect(optionRect);
                })
                .fill(self.palette.primary.normal)
                .class("applicationBackground");
        }

        if(self.delegate.expanded) {
            applicationBackground
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
            applicationBackground
                .class("pointer")
                .on("click", function() {
                    delegate.clicked();
                })
                .on("mouseover", function() {
                    d3.select(this).fill(self.palette.accent1.bright);
                    self.openOptionRect(optionRect);
                })
                .on("mouseout", function() {
                    d3.select(this).fill(self.palette.accent1.normal);
                    self.closeOptionRect(optionRect);
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
        if(nameGroup == undefined) {
            nameGroup = layer.append("g")
                .class("nameGroup");
        }

        // Create option rectangle
        if(optionRect == undefined) {
            optionRect = nameGroup.append("rect")
                .class("optionRect")
                .width(UIApplication.style.applicationBackgroundWidthNotExpanded)
                .height(UIApplication.style.optionRectHeight)
                .x( - UIApplication.style.applicationBackgroundWidthNotExpanded / 2)
                .y( UIApplication.style.optionRectHeight)
                .style("opacity", 0)
                .fill(self.palette.accent1.normal);
        }

        // Create the status rect
        if(headerRect == undefined) {
            headerRect = nameGroup.append("rect")
                .class("no_interaction")
                .class("headerRect");
        }

        // Update the status rect
        headerRect
            .fill(self.statusColor());

        if(appName == undefined) {
            appName = nameGroup.append("text")
                .class("name")
                .class("pointer")
                .class("no_interaction")
                .attr("text-anchor", "middle")
                .fill(self.palette.text.bright);
        }

        appName.text(delegate.name);

        // add close button
        if(closeIcon == undefined) {
            closeIcon = nameGroup.append("svg:image")
                .attr('width', 20)
                .attr('height', 20)
                .attr("xlink:href", "img/cross_red_border_white.svg")
                .class("closeApp")
                .class("pointer")
                .style("opacity", 0)
                .on("click", function () {
                    delegate.closeButtonClicked();
                });
        }

        // Application name
        if(self.delegate.expanded) {
            // move the name
            appName
                .transition()
                .duration(Animations.application.APPLICATION_EXPANSION.duration)
                .x(0)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 20);

            // move the rect
            headerRect
                .transition()
                .x(-windowViewController.width / 2 + UIApplication.style.margin )
                .y(-windowViewController.height / 2 + UIApplication.style.margin)
                .attr('width', windowViewController.width - UIApplication.style.margin * 2)
                .transition()
                .attr('height', UIApplication.style.headerRectHeightExpanded)
                .transition();

            // move close button
            closeIcon
                .on("mouseover", function() {
                    d3.select(this).attr("xlink:href","img/cross_red_border_white_mouseover.svg");
                })
                .on("mouseout", function() {
                    d3.select(this).attr("xlink:href","img/cross_red_border_white.svg");
                })
                .transition()
                .x(windowViewController.width / 2 - UIApplication.style.margin - 25)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 5)
                .width(40)
                .height(40)
                .attr("xlink:href","img/cross_red_border_white.svg")
                .transition()
                .delay(750)
                .style("opacity", 1);

        }
        else {
            appName
                .transition()
                .x(0)
                .y(0);

            headerRect
                .transition()
                .attr('width', UIApplication.style.applicationBackgroundWidthNotExpanded)
                .attr('height', UIApplication.style.headerRectHeightNotExpanded)
                .x(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2)
                .y(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2);

            closeIcon
                .on("mouseover", null)
                .on("mouseout", null)
                .x(0)
                .y(0)
                .width(0)
                .height(0)
                .style("opacity", 0);
        }

        appName
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