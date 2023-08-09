import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { getSubredditsThunk  } from '../../store/subRedditSlice';
import './Subreddits.css';
import {
  setSelectedSubreddit,
  selectFilteredPosts,
} from '../../store/redditSlice';

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.subreddits)
  const selectedSubreddit = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(getSubredditsThunk());
  }, [dispatch]);

  return (
    <Card className="subredditCard">
      <h2 className='subredditcardh2'>Subreddits</h2>
      <ul className="subredditslist">
        {subreddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className={`${
              selectedSubreddit === subreddit.url && `selected-subreddit`
            }`}
          >
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              <img
                src={subreddit.icon_img}
                alt={`${subreddit.display_name}`}
                className={`subredditIcon border-${subreddit.primary_color}`}
              />
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Subreddits;