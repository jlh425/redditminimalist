import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post/Post';
import PostLoading from '../components/Post/PostLoading';
import getRandomNumber from '../utils/getRandomNumber';
import {
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
  fetchComments} from '../store/redditSlice';
import './Home.css';

const Home = () => {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if (isLoading) {
    return (
      <div>
        {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <h2>Failed to load posts.</h2>
        <button
          className='home-errorButton'
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="home-error">
        <h2>No posts matching = {searchTerm}</h2>
        <button className='home-errorButton' type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
          className="home-post"
          key={post.id}
          post={post}
          onToggleComments={() => onToggleComments(index)} // Pass the function itself
        />
      ))}
    </>
  );
};

export default Home;