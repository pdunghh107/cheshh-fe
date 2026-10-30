import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { type ApiResponse, unwrapApiResponse } from "@/types/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "Lỗi cấu hình: Biến môi trường 'VITE_API_BASE_URL' chưa được thiết lập trong file .env!",
  );
}

const axiosConfig = {
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const apiClient = axios.create(axiosConfig);

let inMemoryAccessToken: string | null = null;

export const getAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

export const setAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

/**
 * 1. Request Interceptor: Tự động gắn Authorization Header nếu có Access Token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 2. Response Interceptor: Xử lý 401 Unauthorized & Tự động gọi Refresh Token
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    // Tự động unwrap envelope ApiResponse thành data nghiệp vụ
    response.data = unwrapApiResponse(response.data);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu gặp lỗi 401 Unauthorized và request chưa từng được retry
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Tránh lặp vô hạn nếu chính request refresh token bị 401
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        setAccessToken(null);
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Nếu đang trong quá trình refresh token từ 1 request trước, cho request này vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Backend sẽ đọc Refresh Token từ Cookie (nhờ withCredentials: true)
        const refreshResponse = await axios.post<
          ApiResponse<{ accessToken?: string; token?: string }>
        >(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });

        const authData = unwrapApiResponse<{
          accessToken?: string;
          token?: string;
        }>(refreshResponse.data);
        const newAccessToken = authData.accessToken || authData.token || null;
        setAccessToken(newAccessToken);

        // Chạy lại toàn bộ request trong hàng đợi với token mới
        processQueue(null, newAccessToken);

        // Gắn token mới cho request hiện tại và thử lại
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token cũng hết hạn -> Hủy phiên, xóa token và điều hướng về trang Login
        processQueue(refreshError, null);
        setAccessToken(null);
        window.location.href = "/login?redirect=true";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
