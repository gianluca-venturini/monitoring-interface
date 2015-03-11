var ApplicationViewController = function(name, view) {
    var self = ViewController(view);

    // Protected variables
    self._instanceViewControllers = {};
    self._expansionAnimationFinished = undefined;
    self._reductionAnimationFinished = undefined;

    // Public variables
    self.name = undefined;
    self.expanded = undefined;
    self.coordinates = undefined;

    // Render function of the component
    var render = self.render;
    self.render = function() {
        var data = applicationModel.getApplicationData(self.name);

        render();

        self.renderInstances();
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

    self.renderInstances = function() {
        var instances = applicationModel.getApplicationData(self.name).instances;
        if(instances != undefined) {

            // Create new instance tabs
            self._view.selectAll(".instance_tabs")
                .data(instances)
                .enter()
                .tabTable()
                .append("g")
                .class("instance_tab")
                .each(function(data, index) {
                    this.instanceViewController = InstanceViewController(self, data.name, index, d3.select(this), self);
                    self._instanceViewControllers[data.name] = this.instanceViewController;
                });

            // Update instance tabs
            self._view.selectAll(".instance_tab")
                .data(instances)
                //.attr("transform", function(d) { return "translate(" + self._width/2 + "," + self._height/2 + ")"})
                .each(function(data) {
                    var instanceViewController = this.instanceViewController;
                    instanceViewController.name = data.name;

                    // Render the application
                    instanceViewController.render();
                });

            // Delete instance tabs
            self._view.selectAll(".instance_tab")
                .data(instances)
                .exit()
                .each(function(data) {
                    var instanceViewController = this.instanceViewController;
                    instanceViewController.deinit();
                    delete self._instanceViewControllers[data.name];
                })
                .remove();
        }
    };


    // Constructor
    self.init = function() {

        self.coordinates = {x: 0, y: 0};

        self.name = name;

        self.expanded = false;

        // Add graphic components

        self.addUIApplication();
        self.addUIConnectionView();

        notificationCenter.subscribe(Notifications.ui.APPLICATION_CLICKED, function() {
            self.expanded = false;
            self.render();
        });

        notificationCenter.subscribe(Notifications.ui.APPLICATION_EXPANSION_FINISHED, function() {
            self._expansionAnimationFinished = true;
        });

        notificationCenter.subscribe(Notifications.ui.APPL, function() {
            self._expansionAnimationFinished = true;
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

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };
    return self;

};