// redditSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../services/reddit';
import { createSelector } from 'reselect';

const initialState = {
  posts: [],
  loadingPosts: false,
  errorPosts: false,
  searchTerm: '',
  selectedSubreddit: '',
  showingComments: false,
  comments: [],
  loadingComments: false,
  errorComments: false,
};

// Thunks

export const getPosts = createAsyncThunk('reddit/getPosts', async (subreddit, { rejectWithValue }) => {
  try {
    const posts = await getSubredditPosts(subreddit);
    return posts;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const posts = await getSubredditPosts(subreddit);
    dispatch(setPosts(posts));
    dispatch(getPostsSuccess());
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async (permalink, { rejectWithValue }) => {
    try {
      const comments = await getPostComments(permalink);
      return comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Selectors

export const selectPosts = (state) => state.reddit.posts;
export const selectComments = (state) => state.reddit.comments;

export const selectFilteredPosts = createSelector(
  [selectPosts, (state) => state.reddit.searchTerm],
  (posts, searchTerm) => {
    if (!searchTerm) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
);

// Slice

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loadingPosts = false;
      state.errorPosts = false;
    },
    getPostsFailed: (state) => {
      state.loadingPosts = false;
      state.errorPosts = true;
    },
    getPostsSuccess: (state) => {
      state.loadingPosts = false;
      state.errorPosts = false;
    },
    startGetPosts: (state) => {
      state.loadingPosts = true;
      state.errorPosts = false;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    toggleShowingComments: (state) => {
      state.showingComments = !state.showingComments;
    },
    getCommentsFailed: (state) => {
      state.loadingComments = false;
      state.errorComments = true;
    },
    getCommentsSuccess: (state) => {
      state.loadingComments = false;
      state.errorComments = false;
    },
    startGetComments: (state) => {
      state.loadingComments = true;
      state.errorComments = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loadingPosts = false;
        state.errorPosts = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loadingPosts = false;
        state.errorPosts = true;
      })
      .addCase(fetchComments.pending, (state) => {
        state.loadingComments = true;
        state.errorComments = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loadingComments = false;
        state.errorComments = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loadingComments = false;
        state.errorComments = true;
      });
  },
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

