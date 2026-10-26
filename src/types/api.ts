export interface ApiResponse<T> {
  success: boolean;
  traceId?: string;
  timestamp?: string;
  status: number;
  code?: string;
  message?: string;
  data: T;
}

export interface ApiErrorDetail {
  field?: string;
  code?: string;
  message?: string;
}

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

/**
 * Trích xuất dữ liệu nghiệp vụ bên trong envelope ApiResponse của Backend.
 * Tự động kiểm tra cấu trúc ApiResponse<T> ({ success: true, data: ... }).
 * Nếu payload hợp lệ, hàm trả về payload.data; ngược lại giữ nguyên payload ban đầu.
 */
export function unwrapApiResponse<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    "data" in payload
  ) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
}
