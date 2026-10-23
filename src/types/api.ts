/**
 * Cấu trúc Response thành công từ Backend
 *
 * @see com.pdunghh.shared.api.ApiResponse
 */
export interface ApiResponse<T> {
  success: boolean;
  traceId?: string;
  timestamp?: string;
  status: number;
  code?: string;
  message?: string;
  data: T;
}

/**
 * Chi tiết lỗi từng trường validation (nếu có)
 *
 * @see com.pdunghh.shared.api.ApiErrorDetail
 */
export interface ApiErrorDetail {
  field?: string;
  code?: string;
  message?: string;
}

/**
 * Cấu trúc Error Response từ Backend
 *
 * @see com.pdunghh.shared.api.ApiError
 */
export interface ApiError {
  success: boolean;
  traceId?: string;
  timestamp?: string;
  status: number;
  code?: string;
  message: string;
  serviceName?: string;
  path?: string;
  errors?: ApiErrorDetail[];
}
