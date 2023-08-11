import { useState } from 'react';
import loading from '../../assets/loading.gif';
import './Post.css';
import {
  TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';
import Card from '../Card/Card';
import Comment from '../Comment/Comment';
import PropTypes from 'prop-types';
//need to add prop validation

const Post = ({post, onToggleComments}) => {
    const [showingComments, setShowingComments] = useState(false); 
    const [loadingComments, setLoadingComments] = useState(false);  
    
    const handleToggleComments = () => {
      setShowingComments(!showingComments);
      if (!post.comments) {
        setLoadingComments(true);
        onToggleComments(post.id);
      }
    };
  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (loadingComments) {
      return (
        <div>
          <image src={loading} alt="Loading comments..." />
        </div>
      );
    }

    if (showingComments && post.comments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className="post-wrapper">
          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>

            <div className="post-image-container">
              <img src={post.url} alt="" className="post-image" />
            </div>

            <div className="post-details">                           
                <span className="author-username">{post.author}</span>
                <span>{moment.unix(post.created_utc).fromNow()}</span>
                <span className="post-comments-container">
                  <button onClick={handleToggleComments}>
                    {showingComments ? 'Hide comments' : 'Show comments'} <TiMessage className="icon-action" />
                  </button>
                {shortenNumber(post.num_comments, 1)}
                </span>
            </div>

            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired, 
    onToggleComments: PropTypes.func.isRequired,
    loadingComments: PropTypes.bool.isRequired,
    errorComments: PropTypes.bool.isRequired,
    showingComments: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      })
    ).isRequired,
    ups: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    permalink: PropTypes.string.isRequired,
    num_comments: PropTypes.number.isRequired,
  }).isRequired,
  onToggleComments: PropTypes.func.isRequired,
}


export default Post;