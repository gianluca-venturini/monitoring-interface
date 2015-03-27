var MessagesModel = function() {
    var self = {};

    // Protected variables
    self._data = undefined;
    self._from = undefined;
    self._to = undefined;
    self._type = undefined;

    // Getter and setter
    self.__defineGetter__("data", function() {
        return self._data;
    });
    self.__defineSetter__("data", function(data) {
        self._data = data;
        notificationCenter.dispatch(Notifications.data.MESSAGE_DATA_CHANGE);
    });

    self.__defineGetter__("from", function() {
        return self._from;
    });
    self.__defineSetter__("from", function(from) {
        self._from = from;
        notificationCenter.dispatch(Notifications.data.MESSAGE_DATA_CHANGE);
    });

    self.__defineGetter__("to", function() {
        return self._to;
    });
    self.__defineSetter__("to", function(to) {
        self._to = to;
        notificationCenter.dispatch(Notifications.data.MESSAGE_DATA_CHANGE);
    });

    self.__defineGetter__("type", function() {
        return self._type;
    });
    self.__defineSetter__("type", function(type) {
        self._type = type;
        notificationCenter.dispatch(Notifications.data.MESSAGE_DATA_CHANGE);
    });

    // Destructor
    self.deinit = function() {
        // Place here the code for dealloc eventual objects
    };

    self.fetchData = function(url) {
        d3.json(url, function(error, data) {
            if (error)
                return console.warn(error);

            self._data = data;
        });
    };

    // Constructor
    self.init = function() {
    }();

    return self;
};

var messageModel = MessagesModel();