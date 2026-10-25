import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

/**
 * Axios Instance Client
 *
 * Cấu hình chuẩn cho hệ thống Backend hỗ trợ JWT, CORS và Cookie.
 * - withCredentials: true -> Tự động gửi kèm HttpOnly Cookie qua các domain khác nhau.
 * - baseURL: Đọc từ biến môi trường VITE_API_BASE_URL.
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // BẮT BUỘC để trình duyệt tự động gửi và nhận Cookie (CORS + Cookies)
});

// Lưu trữ Access Token hoàn toàn trong bộ nhớ RAM (In-Memory) để chống tấn công XSS
let inMemoryAccessToken: string | null = null;

// Helper lấy access token từ RAM
export const getAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

// Helper lưu access token vào RAM
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
      if (
        originalRequest.url?.includes("/auth/refresh-token") ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        setAccessToken(null);
        window.location.href = "/login?redirect=true";
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
        const refreshResponse = await axios.post<{
          data?: { accessToken?: string; token?: string };
          accessToken?: string;
          token?: string;
        }>(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });

        const newAccessToken =
          refreshResponse.data.data?.accessToken ||
          refreshResponse.data.data?.token ||
          refreshResponse.data.accessToken ||
          refreshResponse.data.token ||
          null;
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
