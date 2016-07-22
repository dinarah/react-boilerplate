var Comment = React.createClass({
    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.author} @ {this.props.date}</div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});