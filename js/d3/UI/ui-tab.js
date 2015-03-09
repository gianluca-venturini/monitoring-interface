var UITab = function(layer, tabTable, index, data) {
    var self = UIElement(layer);


    UITab.style = {
        maxHeight: 100,
        width: 200,
        outScreen: -400,
        delay: 500
    };

    // Private variables
    var selected = undefined;
    var rect = undefined;

    // Public variables
    self.data = data;


    self.render = function() {
        rect = self._layer.append("rect")
            .x(UITab.style.outScreen)
            .on("mouseover", function() {
                d3.select(this).fill(self.palette.accent.bright);
            })
            .on("mouseout", function() {
                d3.select(this).fill(self.getColor());
            })
            .on("click", function() {
                tabTable.deselectAllTabs();
                self.select();
                // TODO launch instanceView
            })
            .fill(self.palette.accent.normal)
            .transition()
            .delay(UITab.style.delay)
            .width(UITab.style.width)
            .height(self.getTabHeight())
            .x(0)
            .y(index * self.getTabHeight() + UIApplication.style.titleBarHeight);

        self._layer
            .append("text")
            .x(UITab.style.outScreen)
            .transition()
            .delay(UITab.style.delay)
            .x(UITab.style.width/2)
            .y(index * self.getTabHeight() + UIApplication.style.titleBarHeight + self.getTabHeight()/2)
            .attr("text-anchor", "middle")
            .text(self.data.name);
    };

    self.getTabHeight = function() {
        return Math.min(UITab.style.maxHeight, tabTable.parentApplication.getHeight()/tabTable.tabs.length);
    };

    self.getColor = function() {
        var color;
        if(selected) {
            color = self.palette.accent.dark;
        }
        else {
            color = self.palette.accent.normal;
        }
        return color;
    };

    self.select = function() {
        selected = true;
        self.colorTab();
    };

    self.deselect = function() {
        selected = false;
        self.colorTab();
    };

    self.colorTab = function() {
        self._layer.select("rect").fill(self.getColor());
    };

    // Constructor
    self.init = function() {
        rect = layer;
        selected = false;
    }();

    // Destructor
    self.deinit = function() {
        // TODO?
    };

    return self;

};