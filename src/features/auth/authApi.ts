import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";

export interface UserDto {
  id: string;
  username: string;
  email?: string;
  rating: number;
}

export interface AuthResponse {
  accessToken?: string;
  token?: string;
  tokenType?: string;
  user?: UserDto;
  userId?: string;
  username?: string;
  email?: string;
  rating?: number;
  message?: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const loginApi = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    {
      username: payload.usernameOrEmail,
      email: payload.usernameOrEmail,
      password: payload.password,
    },
  );
  return response.data.data;
};

/**
 * Gọi API Đăng ký tài khoản mới
 * POST /api/v1/auth/register
 */
export const registerApi = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    },
  );
  return response.data.data;
};

/**
 * Gọi API Đăng xuất
 * POST /api/v1/auth/logout
 */
export const logoutApi = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

/**
 * Gọi API Silent Refresh Token
 * POST /api/v1/auth/refresh-token
 * Trình duyệt tự động gửi HttpOnly Cookie chứa Refresh Token lên server
 */
export const refreshSilentToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/refresh-token",
  );
  return response.data.data;
};
