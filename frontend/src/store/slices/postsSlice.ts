import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

import { PostType } from "../../Types/Post.types";


interface PostsState {
  post: PostType | null;
  feedPosts: PostType[] | [];
  error: string | null | undefined;
}

interface CreatePostData {
  username: string;
  description: string;
  postImage: string;
}

export const createPost = createAsyncThunk<PostType, CreatePostData>(
  'posts/createPost',
  async (postData) => {
    const response = await axios.post('http://localhost:5000/api/v1/posts', postData);
    return response.data;
  }
);

export const fetchFeedPosts = createAsyncThunk<PostType[]>(
  'posts/fetchFeedPosts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/v1/posts');
    return response.data;
  }
);

const initialState: PostsState = {
  post: null,
  feedPosts: [],
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.feedPosts = action.payload;
        state.error = null;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectPost = (state: RootState) => state.posts.post;
export const selectFeedPosts = (state: RootState) => state.posts.feedPosts;
export const selectError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;