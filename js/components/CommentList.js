var CommentList = React.createClass({
    render: function() {
        var commentsArr = [];

        for (var i = 0; i < this.props.list.length; i++) {
            var comment = this.props.list[i];
            commentsArr.push(
                <Comment key={i} author={comment.author} date={comment.date}>{comment.text}</Comment>
            );
        }

        return(
            <div className="commentList">
                {commentsArr}
            </div>
        )
    }
});