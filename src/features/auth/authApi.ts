import { apiClient } from "@/services/api";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  rating?: number;
}

export interface AuthResponse {
  accessToken: string;
  user: UserDto;
}

export interface LoginPayload {
  email: string;
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
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const registerApi = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );
  return response.data;
};

export const logoutApi = async (): Promise<string> => {
  const response = await apiClient.post<string>("/auth/logout");
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/refresh-token");
  return response.data;
};

export const refreshTokenSilent = refreshToken;
