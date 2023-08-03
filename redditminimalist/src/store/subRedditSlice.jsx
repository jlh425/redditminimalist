// subRedditSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubreddits } from '../services/reddit';

const initialState = {
  subreddits: [],
  loadingSubreddits: false,
  errorSubreddits: false,
};

// Thunks

export const getSubredditsThunk = createAsyncThunk(
  'subreddits/getSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      const subreddits = await getSubreddits();
      return subreddits;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Selectors

export const selectSubreddits = (state) => state.subreddits.subreddits;

// Slice

const subRedditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    getSubredditsFailed: (state) => {
      state.loadingSubreddits = false;
      state.errorSubreddits = true;
    },
    getSubredditsSuccess: (state) => {
      state.loadingSubreddits = false;
      state.errorSubreddits = false;
    },
    startGetSubreddits: (state) => {
      state.loadingSubreddits = true;
      state.errorSubreddits = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubredditsThunk.pending, (state) => {
        state.loadingSubreddits = true;
        state.errorSubreddits = false;
      })
      .addCase(getSubredditsThunk.fulfilled, (state, action) => {
        state.subreddits = action.payload;
        state.loadingSubreddits = false;
        state.errorSubreddits = false;
      })
      .addCase(getSubredditsThunk.rejected, (state) => {
        state.loadingSubreddits = false;
        state.errorSubreddits = true;
      });
  },
});

export const { getSubredditsFailed, getSubredditsSuccess, startGetSubreddits } = subRedditSlice.actions;

export default subRedditSlice.reducer;
