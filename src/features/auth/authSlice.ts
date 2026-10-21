import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { apiClient, setAccessToken } from "@/services/api";

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

/**
 * Async Thunk: Đăng nhập
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post<{
        user: User;
        accessToken: string;
      }>("/auth/login", credentials);
      // Lưu access token vào storage
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại!",
      );
    }
  },
);

/**
 * Async Thunk: Đăng xuất (xóa token ở client và báo backend xóa cookie)
 */
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Kể cả backend lỗi vẫn dọn sạch state phía client
  } finally {
    setAccessToken(null);
  }
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
