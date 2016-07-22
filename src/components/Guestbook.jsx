import React from 'react';
import CommentBox from './CommentBox.jsx';

var Guestbook = React.createClass({
    render: function() {
        return(
            <div>
               <CommentBox /> 
            </div>
        );
    }
});

module.exports = Guestbook;