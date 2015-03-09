var UITabTable = function(layer, parentApplication) {
    var self = UIElement(layer);


    // Public variables
    self.data = undefined;
    self.parentApplication = parentApplication;
    self.tabs = [];

    // Render the element
    self.render = function() {
        if(self.data != undefined) {
            self._layer.selectAll("g")
                .data(self.data)
                .enter()
                .tabTable()
                .append("g")
                .each(function(data, index) {
                    this.tab = UITab(d3.select(this), self, index, data);
                    self.tabs.push(this.tab);
                    // Render the tab
                    this.tab.render();
                });

        }
    };

    self.deselectAllTabs = function() {
        self.tabs.forEach(function(tab) {
            tab.deselect();
        });
    };

    // Constructor
    self.init = function() {
        self._layer = layer;
    }();

    // Destructor
    self.deinit = function() {
        // TODO ?
        //tabs.each(function(tab){
        //    tab.deinit();
        //}).remove();
    };


    return self;

};