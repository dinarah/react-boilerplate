import React from 'react';

var CommentForm = React.createClass({

    onButtonClick: function() {
        var date = new Date();
        this.props.onPost({
            author: this.state.author,
            text: this.state.text,
            date: date.getMonth() + "/" + date.getFullYear()
        });

        this.setState({
            author: "",
            text: ""
        });
    },

    onAuthorChange: function(e) {
        this.setState({
            author: e.target.value
        });
    },

    onTextChange: function(e) {
        this.setState({
            text: e.target.value
        });
    },

    getInitialState: function() {
        return {
            author: "",
            text: ""
        }
    },

    render: function() {
        return(
            <div className="commentForm">
                <div className="form-group">
                    <label for="author">Author</label>
                    <input onChange={this.onAuthorChange} value={this.state.author} type="text" className="form-control" id="author" placeholder="Author"/>
                </div>
                <div className="form-group">
                    <label for="message">Message</label>
                    <textarea onChange={this.onTextChange} value={this.state.text} placeholder="Message" className="form-control" id="message" rows="3"></textarea>
                </div>
                <button onClick={this.onButtonClick} className="btn btn-default">Submit</button>
            </div>
        )
    }
});

module.exports = CommentForm;