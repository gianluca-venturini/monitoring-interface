var UIConnectionView = function(layer) {
    var self = UIElement(layer);

    // Static attributes
    UIConnectionView.style = {
        margin: 10
    };

    // Public variables
    self.data = undefined;

    // Private variables
    self._radius = 5;

    // Render the element
    self.render = function() {
        if(self.data == undefined)
            return;

        console.log(self.data.length);

        d3.layout.radial()
            .components(self.data);
    };

    // Constructor
    self.init = function() {
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
        self._layer.remove();
    };

    return self;
};