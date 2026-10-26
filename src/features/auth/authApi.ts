import { apiClient } from "@/services/api";

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
  const response = await apiClient.post<AuthResponse>("/auth/login", {
    username: payload.usernameOrEmail,
    email: payload.usernameOrEmail,
    password: payload.password,
  });
  return response.data;
};

export const registerApi = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", {
    username: payload.username,
    email: payload.email,
    password: payload.password,
  });
  return response.data;
};

export const logoutApi = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const refreshSilentToken = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/refresh-token");
  return response.data;
};
