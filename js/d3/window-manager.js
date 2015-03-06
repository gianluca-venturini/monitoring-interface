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

        // Create new applications
        self._svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .each(function(data) {
                var application = UIApplication(d3.select(this));
                application.data = data;
                this.application = application;
                self._uiApplications.push(application);
            });

        // Update data in applications
        self._svg.selectAll("g")
            .data(data)
            .attr("transform", function(d) { return "translate(" + self._width/2 + "," + self._height/2 + ")"})
            .each(function(data) {
                var application = this.application;
                application.data = data;

                // Render the application
                application.render();
            });

        // Delete old applications
        self._svg.selectAll("g")
            .data(data)
            .exit()
            .each(function(data) {
                var application = this.application;
                application.deinit();
            })
            .remove();
    };

    self.getWidth = function() {
        return self._width;
    };

    self.getHeight = function() {
        return self._height;
    };

    self.init = function() {

        self._svg = svg;
        self._uiApplications = [];

        self.updateViewBox();

        window.addEventListener("resize", self.updateViewBox);

        self.fetchData("data/data.json");

        //setTimeout(function(){ self.fetchData("data/data2.json"); }, 3000);

    }();

    return self;
};
