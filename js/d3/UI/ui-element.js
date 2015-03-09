var UIElement = function(delegate) {
    var self = {};

    // Public variables
    self.delegate = undefined;

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
    self.palette = UIElement.defaultPalette;

    // Constructor
    self.init = function() {
        self.delegate = delegate;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

    };

    return self;

};