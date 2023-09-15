// authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

interface User {
  firstName: string;
  lastName: string;
  userId: string
  email: string;
  role: string;
  token: string;
  username:string;
  createdAt: Date | string | undefined;
  userPicture: string | undefined;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  mode: string;
  user: User | null;
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

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const initialState: AuthState = {
  mode: "light",
  user:  null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk<User, RegistrationData, { rejectValue: string }>(
    "auth/register",
    async (registrationData, { rejectWithValue }) => {
      try {
        const response: AxiosResponse<User> = await axios.post("http://localhost:5000/api/v1/auth/register", registrationData);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored in local storage:', response.data.token);
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data; 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            return rejectWithValue(error.response.data.msg);
          }
        }
        return rejectWithValue("An error occurred while registering.");
      }
    }
  );

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored in local storage:', response.data.token);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            return rejectWithValue(error.response.data.msg);
          }
        }
        return rejectWithValue("An error occurred while logging in.");
      }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "light" : "dark"
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
      });
  },
});
export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
