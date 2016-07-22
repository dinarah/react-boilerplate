import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';
import Guestbook from './components/Guestbook.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="/home" component={Home}></Route>
            <Route path="/guestbook" component={Guestbook}></Route>
        </Route>
    </Router>
,document.getElementById('content'));



