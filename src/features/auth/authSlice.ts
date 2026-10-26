import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { AUTH_MESSAGES } from "@/commons/messages";
import {
  type AuthResponse,
  loginApi,
  type LoginPayload,
  logoutApi,
  refreshTokenSilent,
  type UserDto,
} from "@/features/auth/authApi";
import { setAccessToken } from "@/services/api";
import { extractErrorMessage } from "@/store/utils/extractErrorMessage";
import { handleApiError, handleApiSuccess } from "@/utils/toast";

export type User = UserDto;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // true khi khởi tạo để đợi restore session
  error: null,
};

/**
 * Async Thunk: Khôi phục phiên đăng nhập khi F5 hoặc mở lại ứng dụng
 */
export const restoreAuthSession = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("auth/restoreAuthSession", async (_, thunkAPI) => {
  try {
    const data = await refreshTokenSilent();
    setAccessToken(data.accessToken);
    return data;
  } catch (err: unknown) {
    setAccessToken(null);
    return thunkAPI.rejectWithValue(extractErrorMessage(err));
  }
});

/**
 * Async Thunk: Đăng nhập
 */
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const data = await loginApi(payload);
    setAccessToken(data.accessToken);
    handleApiSuccess(AUTH_MESSAGES.LOGIN_SUCCESS);
    return data;
  } catch (err: unknown) {
    const errorMsg = handleApiError(err, AUTH_MESSAGES.LOGIN_FAILED);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

/**
 * Async Thunk: Đăng xuất
 */
export const logoutUser = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, thunkAPI) => {
  try {
    const message = await logoutApi();
    handleApiSuccess(message || AUTH_MESSAGES.LOGOUT_SUCCESS);
    return message;
  } catch (err: unknown) {
    handleApiError(err, AUTH_MESSAGES.LOGOUT_FAILED);
    return thunkAPI.rejectWithValue(extractErrorMessage(err));
  } finally {
    setAccessToken(null);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      setAccessToken(action.payload.accessToken);
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      setAccessToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      // Restore Session
      .addCase(restoreAuthSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreAuthSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(restoreAuthSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
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
        state.error = action.payload ?? AUTH_MESSAGES.LOGIN_FAILED;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
