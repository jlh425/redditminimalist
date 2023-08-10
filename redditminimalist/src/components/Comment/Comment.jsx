import { PropTypes } from 'prop-types';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './Comment.css';



Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

function Comment(props) {
  const { comment } = props;

  return (
    <div className="comment-comment">
      <div className="comment-metadata">        
        <p className="comment-author">{comment.author}</p>
        <p className="comment-created-time">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown source={comment.body} />
    </div>
  );
}

export default Comment;