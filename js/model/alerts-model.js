var AlertsModel = function() {
    var self = {};

    // Protected variables
    self._application = undefined;
    self._instance = undefined;
    self._component = undefined;
    self._emails = undefined;

    // Getter and setter
    self.__defineGetter__("application", function() {
        return self._application;
    });
    self.__defineSetter__("application", function(application) {
        self._application = application;
        notificationCenter.dispatch(Notifications.alerts.ALERT_CHANGE);
    });

    self.__defineGetter__("instance", function() {
        return self._instance;
    });
    self.__defineSetter__("instance", function(instance) {
        self._instance = instance;
        notificationCenter.dispatch(Notifications.alerts.ALERT_CHANGE);
    });

    self.__defineGetter__("component", function() {
        return self._component;
    });
    self.__defineSetter__("component", function(component) {
        self._component = component;
        notificationCenter.dispatch(Notifications.alerts.ALERT_CHANGE);
    });

    self.__defineGetter__("emails", function() {
        return self._emails;
    });
    self.__defineSetter__("emails", function(emails) {
        self._emails = emails;
        notificationCenter.dispatch(Notifications.alerts.ALERT_CHANGE);
    });

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    self.fetchData = function(url) {
        d3.json(url, function(error, data) {
            if (error)
                return console.warn(error);

            self.emails = data.emails;
            self.application = data.application;
            if(data.instance) {
                self.instance = data.instance;
            }
            if(data.component) {
                self.component = data.component;
            }

        });
    };

    // Constructor
    self.init = function() {
    }();

    return self;
};

var alertsModel = AlertsModel();