
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import sidebarReducer from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    sidebar: sidebarReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
