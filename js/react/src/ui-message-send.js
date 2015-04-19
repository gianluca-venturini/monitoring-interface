var UIJSONAttribute = React.createClass ({
    getInitialState: function() {
        return({
            type: "string",
            value: "",
            key: ""
        })
    },
    handleTypeChange: function(type) {
        this.setState({type: type})
    },
    handleKeyChange: function(event) {
        switch(this.state.type) {
            case "string":
                this.setState({key: event.target.value});
                break;
        }
        this.props.updateJSON();
    },
    handleValueChange: function() {
        switch(this.state.type) {
            case "string":
                this.setState({value: event.target.value});
                break;
        }
        this.props.updateJSON();
    },
    getJson: function() {
        //alert("getJson UIJSONAttribute");
        var json = {};
        switch(this.state.type) {
            case "string":
                json[this.refs.key.getDOMNode().value] = this.refs.value.getDOMNode().value;
                break;
            case "object":
                json[this.refs.key.getDOMNode().value] = this.refs.object.getJson();
                break;
        }
        return json;
    },
    render: function() {

        var self = this;

        var inputBox = "";
        switch(this.state.type) {
            case "string":
                inputBox =  <div className="col-lg-4 col-md-4 col-sm-4" style={{padding: "10px"}}>
                                <input
                                    onChange={this.handleValueChange}
                                    type="text" className="form-control"
                                    placeholder="String"
                                    aria-describedby="basic-addon2"
                                    value={this.state.value}
                                    ref="value"/>
                            </div>;
                break;
            case "object":
                inputBox =  <div className="col-lg-12 col-md-12 col-sm-12" style={{padding: "10px"}}>
                                <UIJSONObject updateJSON={this.props.updateJSON} ref="object"/>
                            </div>;
                break;
        }

        return (
            <div>
                <div className="col-lg-6 col-md-6 col-sm-6 " style={{padding: "10px"}}>
                    <div className="input-group">
                        <input
                            onChange={this.handleKeyChange}
                            type="text" className="form-control"
                            placeholder="Key"
                            aria-describedby="basic-addon2"
                            value={this.state.key}
                            ref="key"/>
                        <div className="input-group-btn">
                            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{self.state.type}
                                <span className="caret"></span></button>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                <li role="presentation"><a role="menuitem" tabindex="-1" onClick={function() { self.handleTypeChange("string")}}>String</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" onClick={function() { self.handleTypeChange("number")}}>Number</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" onClick={function() { self.handleTypeChange("array")}}>Array</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" onClick={function() { self.handleTypeChange("object")}}>Object</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {inputBox}
            </div>
        );
    }
});

var UIJSONObject = React.createClass ({
    getInitialState: function() {
        return({
            attributes: 2
        })
    },
    getJson: function() {
        //alert("Get json UIJSONObject");
        var json = {};

        // Construct the json with the children
        for(var i = 0; i < this.state.attributes; i++) {
            var attribute = this.refs['object-attribute-' + i].getJson();
            json = _.extend(json, attribute);
        }
        return json;
    },
    render: function() {
        var attributes = [];

        for(var i = 0; i < this.state.attributes; i++) {
            attributes.push(<UIJSONAttribute updateJSON={this.props.updateJSON} ref={"object-attribute-" + i}/>);
        }

        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    {attributes}
                </div>
            </div>
        );
    }
});

var UIJSONRender = React.createClass ({
    render: function() {
        return(
            <pre>
                <code className="JSON">
                    {JSON.stringify(this.props.json, null, 4)}
                </code>
            </pre>
        );
    },
    /*
    componentDidUpdate: function() {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
    */
});

var UIMessageSend = React.createClass ({
    getInitialState: function() {
        return {
            application: undefined,
            instance: undefined,
            component: undefined,
            json: {}
        }
    },

    componentDidMount: function() {
        var self = this;
    },
    updateJSON: function() {
        //alert("Update JSON");
        console.log(this.refs.jsonObject.getJson());
        this.setState({json: this.refs.jsonObject.getJson()})
    },
    render: function() {
        var self = this;

        subscription = [];

        if(this.state.application != undefined) {
            subscription.push(<span>application: <span className="label label-default">{this.state.application}</span></span>);
        }

        if(this.state.instance != undefined) {
            subscription.push(<span> instance: <span className="label label-default">{this.state.instance}</span></span>);
        }

        if(this.state.component != undefined) {
            subscription.push(<span> component: <span className="label label-default">{this.state.component}</span></span>);
        }

        return (
            <div className="modal-dialog modal-messages">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title text-center" id="myMailLabel">Send message to {subscription}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <UIJSONRender json={this.state.json}/>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8">
                            <UIJSONObject updateJSON={this.updateJSON} ref="jsonObject"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        );
    }
});

