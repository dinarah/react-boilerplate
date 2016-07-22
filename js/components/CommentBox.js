var CommentBox = React.createClass({

    handleCommentPost: function(post) {

        var newData = this.state.data;
        newData.push({
            author: post.author,
            text: post.text,
            date: post.date
        });

        this.setState({
            data: newData
        });
    },

    // from React API
    getInitialState: function() {
        return {
            data: []
        }
    },

    // from React API
    componentDidLoad: function() {
        // Get initial data from server and store it in newData
        /*this.setState({
            data: newData
        });*/
    },

    // from React API
    render: function() {
        return(
            <div className="commentBox">
                <CommentList list={this.state.data}/>
                <CommentForm onPost={this.handleCommentPost} />
            </div>
        );
    }
});