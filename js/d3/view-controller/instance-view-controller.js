var InstanceViewController = function(parentApplicationViewController, name, index, layer) {
    var self = ViewController(layer);

    // Public variables
    self.name = undefined;
    self.applicationName = undefined;
    //self.selected = undefined;
    self.parentApplicationViewController = undefined;

    var render = self.render;
    self.render = function() {
        render();
    };

    self.clicked = function() {
        if(!self.selected()) {
            applicationModel.viewControllerInstanceSelected = self;
            //self.selected = true;
            notificationCenter.dispatch(Notifications.ui.INSTANCE_CLICKED);
            //self.selected = true;
        }

    };

    self.getTabsNumber = function() {
          return _.size(self.parentApplicationViewController._instanceViewControllers);
    };

    self.selected = function() {
        return applicationModel.viewControllerInstanceSelected == self;
    };

    // Constructor
    self.init = function() {
        self.name = name;
        self.parentApplicationViewController = parentApplicationViewController;
        self.applicationName = self.parentApplicationViewController.name;
        //self.selected = false;

        self.addUITab(index);

        //notificationCenter.subscribe(Notifications.ui.INSTANCE_CLICKED, function() {
        //    //self.selected = false;
        //    //self._uis.forEach(function(tab){
        //    //    tab.updateColor();
        //    //});
        //});
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    return self;

};