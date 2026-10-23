import toast from "react-hot-toast";
import axios from "axios";

import { colors } from "@/commons/colors";
import { SYSTEM_MESSAGES } from "@/commons/messages";
import type { ApiError, ApiResponse } from "@/types/api";

/**
 * Toast Notification Utility
 *
 * Tích hợp react-hot-toast với theme chuẩn ChessHH (Xanh lá cờ vua + Trắng)
 * và phân tích thông điệp từ ApiResponse / ApiError của Backend.
 */

const baseToastStyle = {
  borderRadius: "10px",
  padding: "12px 18px",
  fontSize: "14px",
  fontWeight: 500,
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      ...baseToastStyle,
      background: "#ffffff",
      color: colors.neutral.darkest,
      border: `1px solid ${colors.primary.light}`,
    },
    iconTheme: {
      primary: colors.primary.base,
      secondary: "#ffffff",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      ...baseToastStyle,
      background: "#ffffff",
      color: colors.neutral.darkest,
      border: `1px solid ${colors.danger.light}`,
    },
    iconTheme: {
      primary: colors.danger.base,
      secondary: "#ffffff",
    },
  });
};

/**
 * Hiển thị toast thông báo thành công từ ApiResponse hoặc chuỗi thông báo
 */
export const handleApiSuccess = <T>(
  response?: ApiResponse<T> | string,
  fallbackMessage: string = SYSTEM_MESSAGES.OPERATION_SUCCESS,
) => {
  if (typeof response === "string") {
    showSuccessToast(response || fallbackMessage);
    return;
  }

  const message = response?.message || fallbackMessage;
  showSuccessToast(message);
};

/**
 * Hiển thị toast thông báo lỗi từ ApiError (hoặc Axios error object)
 */
export const handleApiError = (
  error: unknown,
  fallbackMessage: string = SYSTEM_MESSAGES.OPERATION_FAILED,
) => {
  let message = fallbackMessage;

  if (axios.isAxiosError<ApiError>(error)) {
    message = error.response?.data?.message || error.message || fallbackMessage;

    // TODO: Có nên xử lý hiển thị toast cho từng detail lỗi trong error.response?.data?.errors (ApiErrorDetail[]) không?
    // Hiện tại giữ thông báo tổng quát ở cấp độ message để tránh spam giao diện người dùng.
    // Nếu sau này muốn hiển thị cụ thể cho từng field (ví dụ: errors.map(e => e.message)),
    // có thể cân nhắc tích hợp vào error state của react-hook-form (setError) hoặc hiển thị toast phụ tại đây.
  } else if (error instanceof Error) {
    message = error.message;
  }

  showErrorToast(message);
};
