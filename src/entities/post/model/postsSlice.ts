import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "@shared/api/postsApi";
import type { Post } from "./types";

interface PostsState {
  items: Post[];
  loading: boolean;
  hasMore: boolean;
  skip: number;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  hasMore: true,
  skip: 0,
};

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (skip: number = 0) => {
    const data = await fetchPosts(skip);
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadPosts.fulfilled,
        (
          state,
          action: PayloadAction<{
            posts: Post[];
            total: number;
            skip: number;
            limit: number;
          }>
        ) => {
          if (action.payload.skip === 0) {
            state.items = action.payload.posts;
          } else {
            state.items = [...state.items, ...action.payload.posts];
          }
          state.skip = action.payload.skip + action.payload.limit;
          state.hasMore = state.items.length < action.payload.total;
          state.loading = false;
        }
      )
      .addCase(loadPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;
