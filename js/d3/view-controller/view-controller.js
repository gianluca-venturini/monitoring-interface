var ViewController = function(view) {
    var self = {};

    // Protected variables
    self._view = undefined;
    self._uis = [];

    //#GETTER AND SETTER
    self.__defineSetter__("view", function(view){
        self._view = view;
    });

    self.__defineGetter__("view", function(){
        return self._view;
    });

    self.render = function() {
        self._uis.forEach(function(ui) {
            ui.render(self._view);
        });
    };

    // Add ui components
    self.addUIApplication = function() {
        var uiApplication = UIApplication(self);
        self.addUiComponent(uiApplication);
        return uiApplication;
    };

    self.addUIConnectionView = function() {
        var uiConnectionView = UIConnectionView(self);
        self.addUiComponent(uiConnectionView);
        return uiConnectionView;
    };

    self.addUITab = function(index) {
        var uiTab = UITab(self, index);
        self.addUiComponent(uiTab);
        return uiTab;
    };

    self.addUINotification = function(x, y, notificationName) {
        var uiNotification = UINotification(self, x, y);
        uiNotification.name = notificationName;
        self.addUiComponent(uiNotification);
        return uiNotification;
    };

    self.addUiComponent = function(ui) {
        self._uis.push(ui);
    };

    // Constructor
    self.init = function() {
        self._view = view;
    }();

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    return self;
};