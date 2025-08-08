import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@entities/post/model/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
