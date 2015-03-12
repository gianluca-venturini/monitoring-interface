var InstanceViewController = function(parentApplicationViewController, name, index, layer) {
    var self = ViewController(layer);

    // Private variables
    self._notification = undefined;

    // Public variables
    self.name = undefined;
    self.applicationName = undefined;
    //self.selected = undefined;
    self.parentApplicationViewController = undefined;

    var render = self.render;
    self.render = function() {

        // Display notification only if errors are present
        if(applicationModel.viewControllerApplicationSelected == self.parentApplicationViewController &&
            self.notification() > 0) {
            self._notification.show = true;
        }
        else {
            self._notification.show = false;
        }

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

    self.notification = function() {
        //return self.parentApplicationViewController.notification(name);
        return index+1;
    };

    // Constructor
    self.init = function() {
        self.name = name;
        self.parentApplicationViewController = parentApplicationViewController;
        self.applicationName = self.parentApplicationViewController.name;
        //self.selected = false;

        var tab = self.addUITab(index);

        // Calculate the position of the notification and add it
        self._notification = self.addUINotification(tab.getLeftParent() + UITab.style.width,
                                                    tab.getTopParent() + index * tab.getTabHeight() + UIApplication.style.titleBarHeight);
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    return self;

};