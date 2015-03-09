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
        layer.selectAll("rect")
            .data([{}])
            .enter()
            .append("rect")
            .fill(self.palette.primary.normal)
            .on("click", function() {
                delegate.clicked();
            });

        if(self.delegate.expanded) {
            layer.selectAll("rect")
                .transition()
                .fill(self.palette.primary.normal)
                .margin(UIApplication.style.margin)
                .width(windowViewController.width)
                .height(windowViewController.height)
                .x(-windowViewController.width / 2 + UIApplication.style.margin)
                .y(-windowViewController.height / 2 + UIApplication.style.margin);
        }
        else {
            layer.selectAll("rect")
                .transition()
                .fill(self.palette.primary.normal)
                .width(100)
                .height(100)
                .x(-50)
                .y(-50);
        }

        // Application name
        layer.selectAll(".name")
            .data({})
            .enter()
            .append("text")
            .class("name")
            .x(0)
            .y(0)
            .attr("text-anchor", "middle")
            .text(delegate.name);

        layer.selectAll(".name")
            .data({})
            .x(0)
            .y(0)
            .attr("text-anchor", "middle")
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