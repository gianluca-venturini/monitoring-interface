var UIApplication = function(layer) {
    var self = UIElement(layer);

    // Static attributes
    UIApplication.style = {
        margin: 10
    };

    // Private
    var appRect = undefined;
    var appLabel = undefined;
    var tabTable = undefined;
    var connectionView = undefined;

    // Public variables
    self.data = undefined;
    self.expanded = false;

    self.render = function() {
        if(appRect == undefined) {
            appRect = self._layer.append("rect")
                .attr("fill", "steelblue")
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
                .attr("width", "100")
                .attr("height", "100")
                .attr("x", "-50")
                .attr("y", "-50");

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
            var width = windowManager.getWidth();
            var height = windowManager.getHeight();

            // Background rectangle
            appRect.transition()
                .attr("width", width - UIApplication.style.margin * 2)
                .attr("height", height - UIApplication.style.margin * 2)
                .attr("x", -width/2 + UIApplication.style.margin)
                .attr("y", -height/2 + UIApplication.style.margin);

            tabTable = self._layer.append("g")
                .margin(UIApplication.style.margin)
                .translate(-width/2, -height/2)
                //.attr("transform", function(d) { return "translate(" + (-width/2 + UIApplication.style.margin) + "," + ( -height/2 + UIApplication.style.margin) + ")"})
                .each(function(data) {
                    this.tabTable = UITabTable(d3.select(this));

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

        appLabel.attr("x", 0)
            .attr("y", 0)
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

    // Constructor
    self.init = function() {

    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

    };

    return self;
};