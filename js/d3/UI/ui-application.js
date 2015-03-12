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
        activeStatusColor: "green",
        disabledStatusColor: "red"
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

    self.render = function(layer) {

        // Background rect
        layer.selectAll(".applicationBackground")
            .data([{}])
            .enter()
            .append("rect")
            .fill(self.palette.primary.normal)
            .class("pointer")
            .class("applicationBackground")
            .on("click", function() {
                delegate.clicked();
            });

        if(self.delegate.expanded) {
            layer.selectAll(".applicationBackground")
                .transition()
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
                .fill(self.palette.primary.normal)
                .margin(undefined)
                .width(UIApplication.style.applicationBackgroundWidthNotExpanded)
                .height(UIApplication.style.applicationBackgroundHeightNotExpanded)
                .x(-50)
                .y(-50);
        }

        /*
        layer.selectAll(".headerRect")
            .data([{}])
            .enter()
            .append("rect")
            .attr('width', windowViewController.width - UIApplication.style.margin * 2)
            .attr('height', 30)
            .attr("fill","red")
            .style("opacity", 0)
            .classed("headerRect", true)
            .x(-windowViewController.width / 2 + UIApplication.style.margin )
            .y(-windowViewController.height / 2 + UIApplication.style.margin);

        // add close button
        layer.selectAll(".closeApp")
            .data([{}])
            .enter()
            .append("svg:image")
            .attr('width', 20)
            .attr('height', 20)
            .attr("xlink:href","img/cross.svg")
            .classed("closeApp", true)
            .style("opacity", 1)
            .x(windowViewController.width / 2 - UIApplication.style.margin - 25)
            .y(-windowViewController.height / 2 + UIApplication.style.margin + 5);

        // Application header
        if(self.delegate.expanded) {
            // add header rect
            layer.selectAll(".headerRect")
                .transition()
                .duration(1000)
                .style("opacity", 1);

            layer.selectAll(".closeApp")
                .transition()
                .duration(1000)
                .style("opacity", 1);
        }
        else {
            //layer.selectAll(".headerRect").style("opacity", 0);
            //layer.selectAll(".closeApp").style("opacity", 0);
        }
         // Application name
         layer.selectAll(".name")
         .data([{}])
         .enter()
         .append("text")
         .class("name")
         .class("pointer")
         .attr("text-anchor", "middle")
         .on("click", function() {
         delegate.clicked();
         })
         .text(delegate.name);
        */

        // Application name group
        nameGroup = layer.selectAll(".nameGroup")
            .data([{}])
            .enter()
            .append("g")
            .class("nameGroup");

        // Create the status rect
        nameGroup.append("rect")
            .class("headerRect");

        // Update the status rect
        layer.selectAll(".headerRect")
            .fill(self.statusColor());

        nameGroup.append("text")
            .class("name")
            .class("pointer")
            .attr("text-anchor", "middle")
            .on("click", function() {
                delegate.clicked();
            })
            .text(delegate.name);

        // add close button
        nameGroup.append("svg:image")
            .attr('width', 20)
            .attr('height', 20)
            .attr("xlink:href","img/cross_red_border_white.svg")
            .classed("closeApp", true)
            .class("pointer")
            .style("opacity", 0)
            .on("mouseover", function() {
                d3.select(this).attr("xlink:href","img/cross_red_border_white_mouseover.svg");
            })
            .on("mouseout", function() {
                d3.select(this).attr("xlink:href","img/cross_red_border_white.svg");
            })
            .on("click", function() {
                delegate.closeButtonClicked();
            });

        // Application name
        if(self.delegate.expanded) {
            // move the name
            layer.selectAll(".nameGroup").selectAll(".name")
                .transition()
                .duration(1000)
                .x(0)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 20);
            // move the rect
            layer.selectAll(".nameGroup").selectAll(".headerRect")
                .transition()
                .x(-windowViewController.width / 2 + UIApplication.style.margin )
                .y(-windowViewController.height / 2 + UIApplication.style.margin)
                .transition()
                .attr('height', UIApplication.style.headerRectHeightExpanded)
                .transition()
                .attr('width', windowViewController.width - UIApplication.style.margin * 2);

            // move close button
            layer.selectAll(".nameGroup").selectAll(".closeApp")
                .transition()
                .x(windowViewController.width / 2 - UIApplication.style.margin - 25)
                .y(-windowViewController.height / 2 + UIApplication.style.margin + 5)
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
                .attr('width', UIApplication.style.applicationBackgroundWidthNotExpanded)
                .attr('height', UIApplication.style.headerRectHeightNotExpanded)
                .transition()
                .x(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2)
                .y(-UIApplication.style.applicationBackgroundWidthNotExpanded / 2);

            layer.selectAll(".nameGroup").selectAll(".closeApp")
                .x(0)
                .y(0)
                .style("opacity", 0);
        }

        layer.selectAll(".nameGroup").selectAll(".name")
            .text(delegate.name);

        /*

        if(appLabel == undefined) {
            appLabel = self._layer.append("text")
        }

        if(self.expanded == false) {
            appRect.transition()
                .width(100)
                .height(100)
                .x(-50)
                .y(-50);

            if(tabTable != undefined) {
                tabTable.each(function(data) {
                        // Destructor
                        this.tabTable.deinit();
                    })
                    .remove();

                tabTable = undefined;
            }

            if(connectionView != undefined) {
                connectionView.deinit();
                connectionView = undefined;
            }
        }
        else {
            width = windowManager.getWidth();
            height = windowManager.getHeight();

            // Background rectangle
            appRect.transition()
                .width(self.getWidth())
                .height(self.getHeight())
                .x(-width/2 + UIApplication.style.margin)
                .y(-height/2 + UIApplication.style.margin);

            tabTable = self._layer.append("g")
                .margin(UIApplication.style.margin)
                .translate(-width/2, -height/2)
                .each(function(data) {
                    this.tabTable = UITabTable(d3.select(this), self);

                    this.tabTable.data = data.instances;

                    // Render the application
                    this.tabTable.render();
                });

            if(connectionView == undefined) {
                // Create connectionView component
                var layer = self._layer.newLayer();

                connectionView = UIConnectionView(layer);
                var instanceData = self.instanceData("instance1");
                if(instanceData.components != undefined) {
                    connectionView.data = instanceData.components;
                }
                connectionView.render();
            }
            else {
                // Update connectionView component
                var instanceData = self.instanceData("instance1");
                if(instanceData.components != undefined) {
                    connectionView.data = instanceData.components;
                }

                connectionView.render();
            }
        }

        appLabel
            .x(0)
            .y(0)
            .attr("text-anchor", "middle")
            .text(self.data.name);

         */

    };

    self.instanceData = function(selectedInstance) {
        var d = self.data.instances.filter(function(d) {
            return d.name == selectedInstance
        });

        if(d.count == 0)
            return undefined;

        return d[0];
    };

    /*

    // Expand
    self.expand = function() {
        self.expanded = true;
        self.render();
    };

    // Reduce
    self.reduce = function() {
        self.expanded = false;
        self.render();
    };

    */

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