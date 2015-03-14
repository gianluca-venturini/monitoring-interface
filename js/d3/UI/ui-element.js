
// palette 1
var defaultPalette = {
    primary: {
        dark: "#0288D1",
        normal: "#19BB9B",
        bright: "#B3E5FC"
    },
    text: {
        dark: "#000000",
        bright: "#FFFFFF"
    },
    accent1: {
        dark: "#16a689",
        normal: "#19BB9B",
        bright: "#1dd9b4"
    },
    accent2: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFFFFF"
    },
    accent3: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFE0B2"
    },
    background: {
        dark: "#D2D7D3",
        normal: "#EEEEEE"

    },
    state: {
        red: "#C0392B",
        //red: "#96281B",
        //red: "#F26A4B",
        green: "#019875"
    }
};

/*
// palette 2
var defaultPalette = {
    primary: {
        dark: "#0288D1",
        normal: "#19BB9B",
        bright: "#B3E5FC"
    },
    text: {
        dark: "#FFFFFF",
        bright: "#FFFFFF"
    },
    accent1: {
        dark: "#16a689",
        normal: "#19BB9B",
        bright: "#1dd9b4"
    },
    accent2: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFFFFF"
    },
    accent3: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFE0B2"
    },
    background: {
        dark: "#534f59",
        normal: "#39363D"

    },
    state: {
        red: "#C0392B",
        //red: "#96281B",
        //red: "#F26A4B",
        green: "#019875"
    }
};
*/

/*
// palette 3
var defaultPalette = {
    primary: {
        dark: "#0288D1",
        normal: "#425266",
        bright: "#B3E5FC"
    },
    text: {
        dark: "#FFFFFF",
        bright: "#FFFFFF"
    },
    accent1: {
        dark: "#323e4d",
        normal: "#425266",
        bright: "#536780"
    },
    accent2: {
        dark: "#FFFFFF",
        normal: "#FF9800",
        bright: "#FFFFFF"
    },
    accent3: {
        dark: "#F57C00",
        normal: "#FF9800",
        bright: "#FFE0B2"
    },
    background: {
        dark: "#637b99",
        normal: "#323e4d"

    },
    state: {
        red: "#C0392B",
        //red: "#96281B",
        //red: "#F26A4B",
        green: "#019875"
    }
};
*/

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