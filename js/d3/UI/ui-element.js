var UIElement = function(layer) {
    var self = {};

    // Static attributes
    UIElement.defaultPalette = {
        primary: {
            dark: "#0288D1",
            normal: "#03A9F4",
            bright: "#B3E5FC"
        },
        accent: {
            dark: "#F57C00",
            normal: "#FF9800",
            bright: "#FFE0B2"
        }
    };

    // Protected variables
    self._layer = undefined;
    self.palette = UIElement.defaultPalette;

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