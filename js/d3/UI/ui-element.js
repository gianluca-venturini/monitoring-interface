var UIElement = function(layer) {
    var self = {};

    // Protected variables
    self._layer = undefined;

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