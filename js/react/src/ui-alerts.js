var UIAlerts = React.createClass ({
    getInitialState: function() {
        return {
            application: undefined,
            instance: undefined,
            component: undefined,
            email: "",
            emails: []

        }
    },

    componentDidMount: function() {
        var self = this;

        notificationCenter.subscribe(Notifications.alerts.ALERT_CHANGE, function() {
            self.setState({
                application: alertsModel.application,
                instance: alertsModel.instance,
                component: alertsModel.component
            });
        });

        notificationCenter.subscribe(Notifications.alerts.EMAILS_CHANGE, function() {
            self.setState({
                emails: alertsModel.emails
            });
        });
    },
    handleSubmit: function() {

        var message = {
            application: this.state.application,
            mail: this.state.email
        };

        if(this.state.instance != undefined) {
            message.instance = this.state.instance;
        }

        if(this.state.component != undefined) {
            message.component = this.state.component;
        }

        nutella.net.publish("monitoring/alert/add", message);
        alertsModel.fetchData();
        console.log(message);
    },
    handleChange: function(event) {
        this.setState({email: event.target.value});
    },
    handleDelete: function() {
        alert("Delete ");
        var message = {
            application: this.state.application,
            mail: this.state.email
        };

        if(this.state.instance != undefined) {
            message.instance = this.state.instance;
        }

        if(this.state.component != undefined) {
            message.component = this.state.component;
        }

        nutella.net.publish("monitoring/alert/remove", message);
        alertsModel.fetchData();
    },
    render: function() {
        var self = this;

                    //<div className="floatLeft"><h4>{email}</h4></div>
                    //<div className="floatLeft"><h4><b>X</b></h4></div>
        var emails = this.state.emails.map(function(email, index) {
            return (
                <div>
                    <button type="button" className="close" aria-label="Close" onClick={self.handleDelete}><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myMailLabel">{email}</h4>
                </div>

            )
        });

        return (
            <div className="modal-dialog modal-messages">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myMailLabel">Subscription</h4>
                    </div>
                    <div className="modal-body">
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon" id="sizing-addon1">@</span>
                            <input type="text" id="subscribeEmail" className="form-control" placeholder="e-mail" aria-describedby="sizing-addon1" value={this.state.email} onChange={this.handleChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" id="subscribeButton" onClick={this.handleSubmit}>Subscribe</button>
                            </span>
                        </div>
                        <div className = "emails">
                            {emails}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
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