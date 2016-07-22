var Link = window.ReactRouter.Link;

var Header = React.createClass({
    render: function() {
        return(
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">

                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Dinara's Portfolio</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/guestbook">Guestbook</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        );
    }
});