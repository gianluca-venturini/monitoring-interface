var UIApplication = function(layer) {
    var self = UIElement(layer);

    // Static attributes
    UIApplication.style = {
        margin: 10,
        titleBarHeight: 50
    };

    // Private
    var appRect = undefined;
    var appLabel = undefined;
    var tabTable = undefined;
    var width = undefined;
    var height = undefined;
    var connectionView = undefined;

    // Public variables
    self.data = undefined;
    self.expanded = false;

    self.render = function() {
        if(appRect == undefined) {
            appRect = self._layer.append("rect")
                .fill(self.palette.primary.normal)
                .on("click", function() {
                    if(self.expanded)
                        self.reduce();
                    else
                        self.expand();
                });
        }

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

    };

    self.instanceData = function(selectedInstance) {
        var d = self.data.instances.filter(function(d) {
            return d.name == selectedInstance
        });

        if(d.count == 0)
            return undefined;

        return d[0];
    };

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