var UILegend = function(delegate, name) {
    var self = UIElement(delegate);

    // Public variables

    // Private variables

    self.render = function() {

        var layer = self.view;

        layer.append("text").text("LEGEND");

    };

    // Constructor
    self.init = function() {
        self.name = name;
    }();

    // Destructor
    self.deinit = function() {
    };

    return self;

};