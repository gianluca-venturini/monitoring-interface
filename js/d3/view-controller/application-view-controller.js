var ApplicationViewController = function(name, view) {
    var self = ViewController(view);

    // Public variables
    self.name = undefined;
    self.expanded = undefined;

    self.coordinates = undefined;

    // Render function of the component
    var render = self.render;
    self.render = function() {
        var data = applicationModel.getApplicationData(self.name);

        render();
    };

    self.clicked = function() {

        if(self.expanded == false) {
            applicationModel.viewControllerApplicationSelected = self;
            notificationCenter.dispatch(Notifications.ui.APPLICATION_CLICKED);
            self.expanded = true;
            windowViewController.center(self.coordinates.x, self.coordinates.y);
            notificationCenter.dispatch(Notifications.ui.APPLICATION_EXPANDED);
        }
        else {
            applicationModel.viewControllerApplicationSelected = undefined;
            notificationCenter.dispatch(Notifications.ui.APPLICATION_CLICKED);
            self.expanded = false;
            windowViewController.resetCenter();
            notificationCenter.dispatch(Notifications.ui.APPLICATION_REDUCED);
        }

        self.render();
    };

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    // Constructor
    self.init = function() {

        self.coordinates = {x: 0, y: 0};

        self.name = name;

        self.expanded = false;

        self.addUIApplication();

        notificationCenter.subscribe(Notifications.ui.APPLICATION_CLICKED, function() {
            self.expanded = false;
            self.render();
        });

        var oldCoordinates = undefined;

        notificationCenter.subscribe(Notifications.ui.APPLICATION_EXPANDED, function() {
            oldCoordinates = self.coordinates;
            self.coordinates = {x: (self.coordinates.x - windowViewController.width/2) * 15,
                y: (self.coordinates.y - windowViewController.height/2) * 15
            };
            if(self.expanded == false) {
                self._view.transition().duration(400).translate(self.coordinates.x, self.coordinates.y);
            }
        });

        notificationCenter.subscribe(Notifications.ui.APPLICATION_REDUCED, function() {
            self.coordinates = oldCoordinates;
            if(self.expanded == false) {
                self._view
                    .transition()
                    .duration(1500)
                    .translate(oldCoordinates.x, oldCoordinates.y);
            }
        });
    }();

    return self;

};