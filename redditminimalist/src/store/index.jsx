
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subRedditReducer from './subRedditSlice';

const rootReducer = combineReducers({
  reddit: redditReducer,
  subreddits: subRedditReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;