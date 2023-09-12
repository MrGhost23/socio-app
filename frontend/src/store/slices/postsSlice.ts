import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

import { PostType } from "../../Types/Post.types";


interface PostsState {
  post: PostType | null;
  postLoading: boolean;
  userPosts: PostType[] | [];
  userPostsLoading: boolean;
  feedPosts: PostType[] | [];
  feedPostsLoading: boolean;
  error: string | null | undefined;
}

interface CreatePostData {
  username: string | undefined;
  description: string;
  postImage?: string | object | null;
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

export const fetchUserPosts = createAsyncThunk<PostType[]>(
    'posts/fetchUserPosts',
    async (username: string | any) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/posts/${username}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch user posts.');
    }}
  );

const initialState: PostsState = {
  post: null,
  postLoading: false,
  userPosts: [],
  userPostsLoading: false,
  feedPosts: [],
  feedPostsLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.postLoading = false
        state.post = action.payload;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postLoading = false
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.postLoading = true
        state.error = null;
      })
      .addCase(fetchFeedPosts.pending, (state) => {
        state.feedPostsLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.feedPostsLoading = false
        state.feedPosts = action.payload;
        state.error = null;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.feedPostsLoading = false
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPostsLoading = true
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPostsLoading = true
        state.userPosts = action.payload
        state.error = null;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.userPostsLoading = false
        state.error = action.error.message;
      })

      
  },
});

export const selectPost = (state: RootState) => state.posts.post;
export const selectPostLoading = (state: RootState) => state.posts.postLoading;
export const selectUserPosts = (state: RootState) => state.posts.userPosts;
export const selectUserPostsLoading = (state: RootState) => state.posts.userPostsLoading;
export const selectFeedPosts = (state: RootState) => state.posts.feedPosts;
export const selectFeedPostsLoading = (state: RootState) => state.posts.feedPostsLoading;
export const selectError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;