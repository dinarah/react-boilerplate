var Main = React.createClass({
    render: function() {
        return(
            <div>
              <Header/>
              <div className="container-fluid">
                {this.props.children}  
              </div>
            </div>
        );
    }
});