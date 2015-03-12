var UIElement = function(delegate, x, y) {
    var self = {};

    // Public variables
    self.delegate = undefined;
    self.x = 0;
    self.y = 0;
    self.show = true;

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
        if(x != undefined) self.x = x;
        if(y != undefined) self.y = y;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects

    };

    return self;

};