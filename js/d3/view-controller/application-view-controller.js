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
        }
        else {
            applicationModel.viewControllerApplicationSelected = undefined;
            notificationCenter.dispatch(Notifications.ui.APPLICATION_CLICKED);
            self.expanded = false;
            windowViewController.resetCenter();
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
    }();

    return self;

};