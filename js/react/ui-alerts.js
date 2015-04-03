var UIAlerts = React.createClass ({
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

        var emails = this.state.emails.map(function(email) {
            return (
                <h4>{email}</h4>
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
                            <input type="text" id="subscribeEmail" className="form-control" placeholder="e-mail" aria-describedby="sizing-addon1"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" id="subscribeButton">Subscribe</button>
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