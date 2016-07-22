var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var browserHistory = window.ReactRouter.browserHistory;

var App = React.createClass({
    render: function() {
        return(
            <Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/guestbook" component={Guestbook}></Route>
                </Route>
            </Router>
        );
    }
});

