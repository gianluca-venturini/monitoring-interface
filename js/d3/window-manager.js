var WindowManager = function(svg) {
    var self = {};

    // Protected variables
    self._width = undefined;
    self._height = undefined;
    self._svg = undefined;
    self._uiApplications = undefined;   // UIApplication array

    self.updateViewBox = function() {
        self._width  = window.innerWidth;
        self._height = window.innerHeight;
        svg.attr("viewBox", "0 0 " + self._width + " " + self._height);
    };

    self.fetchData = function(url) {
        d3.json(url, function(error, data) {
            if (error)
                return console.warn(error);

            self.renderData(data.applications);
        });
    };

    self.renderData = function(data) {

        console.log(data);

        self._svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .each(function(data) {
                console.log(d3.select(this));
                var application = UIApplication(d3.select(this));
                self._uiApplications.push(application);
            });

        // Render of the single application
        self._uiApplications.forEach(function(application) {
            application.render();
        });
    };

    self.init = function() {

        self._svg = svg;
        self._uiApplications = [];

        self.updateViewBox();

        window.addEventListener("resize", self.updateViewBox);

        self.fetchData("data/data.json");

    }();

    return self;
};
