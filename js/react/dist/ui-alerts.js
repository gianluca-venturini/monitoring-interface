var UIAlerts = React.createClass ({displayName: "UIAlerts",
    getInitialState: function() {
        return {
            application: undefined,
            instance: undefined,
            component: undefined,
            emails: []

        }
    },

    componentDidMount: function() {
        var self = this;

        notificationCenter.subscribe(Notifications.alerts.ALERT_CHANGE, function() {
            self.setState({
                application: alertsModel.application,
                instance: alertsModel.instance,
                component: alertsModel.component,
                emails: alertsModel.emails
            });

        });

        alertsModel.fetchData("data/alert.json");

        setTimeout(function() {
            alertsModel.fetchData("data/alert.json");
        }, 10000);
    },

    render: function() {
        var self = this;

                    //<div className="floatLeft"><h4>{email}</h4></div>
                    //<div className="floatLeft"><h4><b>X</b></h4></div>
        var emails = this.state.emails.map(function(email, index) {
            return (
                React.createElement("div", null, 
                    React.createElement("button", {type: "button", className: "close", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                    React.createElement("h4", {className: "modal-title", id: "myMailLabel"}, email)
                )

            )
        });

        return (
            React.createElement("div", {className: "modal-dialog modal-messages"}, 
                React.createElement("div", {className: "modal-content"}, 
                    React.createElement("div", {className: "modal-header"}, 
                        React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                        React.createElement("h4", {className: "modal-title", id: "myMailLabel"}, "Subscription")
                    ), 
                    React.createElement("div", {className: "modal-body"}, 
                        React.createElement("div", {className: "input-group input-group-lg"}, 
                            React.createElement("span", {className: "input-group-addon", id: "sizing-addon1"}, "@"), 
                            React.createElement("input", {type: "text", id: "subscribeEmail", className: "form-control", placeholder: "e-mail", "aria-describedby": "sizing-addon1"}), 
                            React.createElement("span", {className: "input-group-btn"}, 
                                React.createElement("button", {className: "btn btn-default", type: "button", id: "subscribeButton"}, "Subscribe")
                            )
                        ), 
                        React.createElement("div", {className: "emails"}, 
                            emails
                        )
                    ), 

                    React.createElement("div", {className: "modal-footer"}, 
                        React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close")
                    )
                )
            )
        );
    },

    componentDidUpdate: function() {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

});

var deleteEmail = function() {
    alert("ciaooo");
};