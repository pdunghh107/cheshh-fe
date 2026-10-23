import {
  type AsyncThunk,
  type AsyncThunkPayloadCreator,
  createAsyncThunk,
  type GetThunkAPI,
} from "@reduxjs/toolkit";
import type { AxiosRequestConfig } from "axios";

import { apiClient } from "@/services/api";
import type { ApiError } from "@/types/api";

/**
 * Cấu hình cho API Thunk tự động
 */
export interface ApiThunkConfig<TResponse, TPayload> {
  /** Method HTTP: 'get' | 'post' | 'put' | 'delete' | 'patch' */
  method: "get" | "post" | "put" | "delete" | "patch";
  /** URL endpoint hoặc function sinh url dựa vào payload */
  url: string | ((payload: TPayload) => string);
  /** Tùy chọn cấu hình axios thêm (headers, params, ...) */
  axiosConfig?: AxiosRequestConfig;
  /** Thông điệp lỗi mặc định khi không đọc được từ Backend */
  defaultErrorMessage?: string;
  /** Callback chạy sau khi request thành công (ví dụ: lưu token, update cache) */
  onSuccess?: (
    data: TResponse,
    payload: TPayload,
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
  ) => void | Promise<void>;
  /** Callback chạy khi request thất bại */
  onError?: (
    error: unknown,
    payload: TPayload,
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
  ) => void | Promise<void>;
  /**
   * Biến đổi dữ liệu response trước khi trả về payload cho Redux state.
   * Nếu Backend trả về ApiResponse<T>, có thể unwrap lấy response.data.data
   */
  transformResponse?: (rawResponse: TResponse) => unknown;
}

/**
 * Trích xuất message lỗi từ ApiError của Backend hoặc Axios error
 */
export const extractErrorMessage = (
  err: unknown,
  fallback = "Có lỗi xảy ra. Vui lòng thử lại!",
): string => {
  if (err && typeof err === "object") {
    if ("response" in err) {
      const resData = (err as { response?: { data?: ApiError } }).response
        ?.data;
      if (resData?.message) {
        return resData.message;
      }
    } else if (
      "message" in err &&
      typeof (err as { message: unknown }).message === "string"
    ) {
      return (err as { message: string }).message;
    }
  }
  return fallback;
};

/**
 * createApiThunk - Wrapper chuẩn cho các async thunk gọi API
 *
 * Tự động hóa:
 * - Gọi apiClient theo method và url tương ứng
 * - Trích xuất dữ liệu response
 * - Bắt lỗi và rejectWithValue kèm message chuẩn từ Backend ApiError
 * - Hỗ trợ lifecycle hooks: onSuccess (ví dụ lưu access token), onError
 *
 * @example
 * export const loginUser = createApiThunk<LoginResponse, LoginCredentials>(
 *   "auth/login",
 *   {
 *     method: "post",
 *     url: "/auth/login",
 *     onSuccess: (data) => {
 *       setAccessToken(data.accessToken);
 *     },
 *   }
 * );
 */
export function createApiThunk<TResponse = unknown, TPayload = void>(
  typePrefix: string,
  config: ApiThunkConfig<TResponse, TPayload>,
): AsyncThunk<TResponse, TPayload, { rejectValue: string }> {
  const payloadCreator: AsyncThunkPayloadCreator<
    TResponse,
    TPayload,
    { rejectValue: string }
  > = async (payload, thunkAPI) => {
    try {
      const endpoint =
        typeof config.url === "function" ? config.url(payload) : config.url;

      let responseData: TResponse;

      if (config.method === "get" || config.method === "delete") {
        const res = await apiClient[config.method]<TResponse>(endpoint, {
          ...config.axiosConfig,
          params: payload,
        });
        responseData = res.data;
      } else {
        const res = await apiClient[config.method]<TResponse>(
          endpoint,
          payload,
          config.axiosConfig,
        );
        responseData = res.data;
      }

      // Xử lý callback onSuccess nếu có
      if (config.onSuccess) {
        await config.onSuccess(responseData, payload, thunkAPI);
      }

      if (config.transformResponse) {
        return config.transformResponse(responseData) as TResponse;
      }

      return responseData;
    } catch (err: unknown) {
      if (config.onError) {
        await config.onError(err, payload, thunkAPI);
      }

      const errorMessage = extractErrorMessage(
        err,
        config.defaultErrorMessage || "Yêu cầu xử lý thất bại!",
      );
      return thunkAPI.rejectWithValue(errorMessage);
    }
  };

  return createAsyncThunk<TResponse, TPayload, { rejectValue: string }>(
    typePrefix,
    payloadCreator,
  );
}
