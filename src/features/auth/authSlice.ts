import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { AUTH_MESSAGES } from "@/commons/messages";
import { setAccessToken } from "@/services/api";
import { createApiThunk } from "@/store/createApiThunk";

/**
 * User Interface
 */
export interface User {
  id: string;
  username: string;
  email?: string;
  rating: number;
}

/**
 * Auth State Interface
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("chesshh_access_token"),
  isLoading: false,
  error: null,
};

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

/**
 * Async Thunk: Đăng nhập
 * Tự động hóa: POST /auth/login, bắt lỗi rejectWithValue, và lưu access token qua onSuccess
 */
export const loginUser = createApiThunk<LoginResponse, LoginCredentials>(
  "auth/loginUser",
  {
    method: "post",
    url: "/auth/login",
    defaultErrorMessage: AUTH_MESSAGES.LOGIN_FAILED,
    onSuccess: (data) => {
      // Custom handler: tự động lưu access token vào storage
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
    },
  },
);

/**
 * Async Thunk: Đăng xuất
 * Tự động hóa: POST /auth/logout và dọn dẹp access token
 */
export const logoutUser = createApiThunk<void, void>("auth/logoutUser", {
  method: "post",
  url: "/auth/logout",
  onSuccess: () => {
    setAccessToken(null);
  },
  onError: () => {
    // Dù backend lỗi vẫn xóa token ở client
    setAccessToken(null);
  },
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      setAccessToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
