var UIApplication = function(layer) {
    var self = UIElement();

    // Static attributes
    UIApplication.style = {
        margin: 10
    };

    // Private
    var appRect = undefined;
    var appLabel = undefined;
    var tabTable = undefined;

    // Protected variables
    self._layer = undefined;

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
        }
        else {
            var width = windowManager.getWidth();
            var height = windowManager.getHeight();

            appRect.transition()
                .attr("width", width - UIApplication.style.margin * 2)
                .attr("height", height - UIApplication.style.margin * 2)
                .attr("x", -width/2 + UIApplication.style.margin)
                .attr("y", -height/2 + UIApplication.style.margin);

            tabTable = self._layer.append("g")
                .attr("transform", function(d) { return "translate(" + (-width/2 + UIApplication.style.margin) + "," + ( -height/2 + UIApplication.style.margin) + ")"})
                .each(function(data) {
                    this.tabTable = UITabTable(d3.select(this));

                    this.tabTable.data = data.instances;

                    // Render the application
                    this.tabTable.render();
                });
        }

        appLabel.attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .text(self.data.name);

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
        self._layer = layer;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

    };

    return self;
};