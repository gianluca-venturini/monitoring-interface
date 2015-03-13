var UIElement = function(delegate) {
    var self = {};

    // Public variables
    self.delegate = undefined;
    self.x = 0;
    self.y = 0;
    self.show = true;

    // Private variables
    self._view = undefined;

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
        self._view = self.delegate.newView();
    }();

    // Destructor
    self.deinit = function() {
        self._view.remove();
    };

    return self;

};