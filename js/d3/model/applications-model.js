var ApplicationsModel = function() {
    var self = {};

    // Public variables
    self.data = undefined;
    self.viewControllerApplicationSelected = undefined;

    self.getApplicationData = function(name) {
        var appData = self.data.applications.filter(function(d) {
            return d.name == name;
        });

        if(appData.length == 0) {
            return undefined;
        }

        return appData[0];
    };

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    self.fetchData = function(url) {
        d3.json(url, function(error, data) {
            if (error)
                return console.warn(error);

            self.data = data;

            notificationCenter.dispatch(Notifications.data.APPLICATION_DATA_CHANGE);
        });
    };

    // Constructor
    self.init = function() {
        self.fetchData("data/data.json");
    }();

    return self;
};

var applicationModel = ApplicationsModel();