import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { ProfileType } from "../../Types/Profile.types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  mode: string;
  user: ProfileType | null;
  loading: boolean;
  error: string | null;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  username: string;
}

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const initialState: AuthState = {
  mode: localStorage.getItem("mode") || "light",
  user: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk<
  ProfileType,
  RegistrationData,
  { rejectValue: string }
>("auth/register", async (registrationData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<{ token: string; user: ProfileType }> =
      await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        registrationData
      );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("Token stored in local storage:", response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data.msg);
      }
    }
    return rejectWithValue("An error occurred while registering.");
  }
});

export const login = createAsyncThunk<
  ProfileType,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<{ token: string; user: ProfileType }> =
      await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("Token stored in local storage:", response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data.msg);
      }
    }
    return rejectWithValue("An error occurred while logging in.");
  }
});

export const toggleFollowUser = createAsyncThunk<
  { status: number; uId: string } | null,
  {
    id: string;
    username: string;
  }
>("auth/toggleFollowUser", async ({ id, username }, { getState }) => {
  const { auth } = getState() as {
    auth: AuthState;
  };

  try {
    const response: AxiosResponse<{ status: number }> = await axios.put(
      `http://localhost:5000/api/v1/users/${username}/follow`,
      {
        username: auth.user!.username,
      }
    );
    return { status: response.data.status, uId: id };
  } catch (error) {
    toast.info(`Something went wrong!`);
    return null;
  }
});

export const toggleBlockUser = createAsyncThunk<
  { status: number; uId: string } | null,
  {
    id: string;
    username: string;
  }
>("auth/toggleBlockUser", async ({ id, username }, { getState }) => {
  const { auth } = getState() as {
    auth: AuthState;
  };
  try {
    const response: AxiosResponse<{ status: number }> = await axios.post(
      `http://localhost:5000/api/v1/users/${username}/block-unblock`,
      {
        username: auth.user!.username,
      }
    );
    return { status: response.data.status, uId: id };
  } catch (error) {
    toast.info(`Something went wrong!`);
    return null;
  }
});

export const toggleBookmarkPost = createAsyncThunk<
  { status: number; postId: string } | null,
  {
    username: string;
    postId: string;
  }
>("auth/toggleBookmarkPost", async ({ username, postId }) => {
  try {
    const response: AxiosResponse<{ status: number }> = await axios.post(
      `http://localhost:5000/api/v1/users/${username}/toggle-bookmark/${postId}`
    );
    return { status: response.data.status, postId };
  } catch (error) {
    toast.info(`Something went wrong!`);
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "An error occurred.";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "An error occurred.";
      })
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        let updatedFollowingArray = [...state.user!.following];

        if (action.payload) {
          if (action.payload.status === 1) {
            updatedFollowingArray.push(action.payload.uId);
          } else {
            updatedFollowingArray = updatedFollowingArray.filter(
              (userId) => userId !== action.payload!.uId
            );
          }
          state.user = { ...state.user!, following: updatedFollowingArray };
        }
      })
      .addCase(toggleBlockUser.fulfilled, (state, action) => {
        let updatedBlockedUsers = [...state.user!.blockedUsers];
        if (action.payload) {
          if (action.payload.status === 1) {
            updatedBlockedUsers.push(action.payload.uId);
          } else {
            updatedBlockedUsers = updatedBlockedUsers.filter(
              (userId) => userId !== action.payload!.uId
            );
          }
          state.user = { ...state.user!, blockedUsers: updatedBlockedUsers };
        }
      })
      .addCase(toggleBookmarkPost.fulfilled, (state, action) => {
        let updatedBookmarks = [...state.user!.bookmarks];

        if (action.payload) {
          if (action.payload.status === 1) {
            updatedBookmarks.push(action.payload.postId);
          } else {
            updatedBookmarks = updatedBookmarks.filter(
              (postId) => postId !== action.payload!.postId
            );
          }
          state.user = { ...state.user!, bookmarks: updatedBookmarks };
        }
      });
  },
});
export const { setUser, toggleMode, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectMode = (state: RootState) => state.auth.mode;

export default authSlice.reducer;
