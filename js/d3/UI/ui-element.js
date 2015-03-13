var defaultPalette = {
    primary: {
        dark: "#0288D1",
        normal: "#03A9F4",
        bright: "#B3E5FC"
    },
    text: {
        dark: "#000000",
        bright: "#FFFFFF"
    },
    accent1: {
        dark: "#225378",
        normal: "#F2F2F2",
        bright: "#6AC2CC"
    },
    accent2: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFE0B2"
    },
    accent3: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFE0B2"
    },
    background: {
        dark: "#ACF0F2",
        normal: "#EDEDED"
    },
    state: {
        red: "#F26A4B",
        green: "#95BF93"
    }
};

var UIElement = function(delegate) {
    var self = {};

    // Public variables
    self.delegate = undefined;
    self.x = 0;
    self.y = 0;
    self.show = true;

    // Private variables
    self._view = undefined;

    // Protected variables
    self.palette = defaultPalette;

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