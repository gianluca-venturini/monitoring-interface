var ApplicationViewController = function(name, view) {
    var self = ViewController(view);

    // Protected variables
    self._instanceViewControllers = {};
    self._expansionAnimationFinished = undefined;
    self._reductionAnimationFinished = undefined;

    // Public variables
    self.name = undefined;
    //self.expanded = undefined;
    self.coordinates = undefined;

    // Render function of the component
    var render = self.render;
    self.render = function() {
        var data = applicationModel.getApplicationData(self.name);

        render();

        self.renderInstances();
    };

    self.closeButtonClicked = function() {
        self.clicked();
    };

    self.clicked = function() {

        if(self.expanded == false) {
            applicationModel.viewControllerApplicationSelected = self;
            notificationCenter.dispatch(Notifications.ui.APPLICATION_CLICKED);
            //self.expanded = true;
            windowViewController.center(self.coordinates.x, self.coordinates.y);
            notificationCenter.dispatch(Notifications.ui.APPLICATION_EXPANSION_STARTED);

            // Notify the end of the animation
            setTimeout(function(){
                notificationCenter.dispatch(Notifications.ui.APPLICATION_EXPANSION_FINISHED);
            }, Animations.application.APPLICATION_EXPANSION.delay + Animations.application.APPLICATION_EXPANSION.duration);

        }
        else {
            applicationModel.viewControllerApplicationSelected = undefined;
            notificationCenter.dispatch(Notifications.ui.APPLICATION_CLICKED);
            //self.expanded = false;
            windowViewController.resetCenter();
            notificationCenter.dispatch(Notifications.ui.APPLICATION_REDUCTION_STARTED);

            // Notify the end of the animation
            setTimeout(function(){
                notificationCenter.dispatch(Notifications.ui.APPLICATION_REDUCTION_FINISHED);
            }, Animations.application.APPLICATION_REDUCTION.delay + Animations.application.APPLICATION_REDUCTION.duration);
        }

        self.render();
    };

    // Data relative to the current selected instance
    self.__defineGetter__("instanceComponentData", function() {
        if(applicationModel.viewControllerInstanceSelected == undefined)
            return undefined;

        var instanceData = applicationModel.getInstanceData(self.name, applicationModel.viewControllerInstanceSelected.name);

        return instanceData.components;
    });

    self.__defineGetter__("expanded", function() {
        return self == applicationModel.viewControllerApplicationSelected;
    });

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

        // Add graphic components

        self.addUIApplication();
        self.addUIConnectionView();

        notificationCenter.subscribe(Notifications.ui.APPLICATION_CLICKED, function() {
            //self.expanded = false;
            self.render();
        });

        notificationCenter.subscribe(Notifications.ui.APPLICATION_EXPANSION_FINISHED, function() {
            self._expansionAnimationFinished = true;
        });

        notificationCenter.subscribe(Notifications.ui.APPL, function() {
            self._expansionAnimationFinished = true;
        });


        var oldCoordinates = undefined;

        notificationCenter.subscribe(Notifications.ui.APPLICATION_EXPANSION_STARTED, function() {
            oldCoordinates = self.coordinates;
            self.coordinates = {x: (self.coordinates.x - windowViewController.width/2) * 15,
                y: (self.coordinates.y - windowViewController.height/2) * 15
            };
            if(self.expanded == false) {
                self._view.transition().duration(400).translate(self.coordinates.x, self.coordinates.y);
            }
        });

        notificationCenter.subscribe(Notifications.ui.INSTANCE_CLICKED, function() {
            self.render();
        });

    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };
    return self;

};