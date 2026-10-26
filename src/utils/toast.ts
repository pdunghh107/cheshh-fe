import toast from "react-hot-toast";
import axios from "axios";

import { colors } from "@/commons/colors";
import { SYSTEM_MESSAGES } from "@/commons/messages";
import type { ApiError, ApiResponse } from "@/types/api";

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

export const handleApiError = (
  error: unknown,
  fallbackMessage: string = SYSTEM_MESSAGES.OPERATION_FAILED,
): string => {
  let message = fallbackMessage;

  if (axios.isAxiosError<ApiError>(error)) {
    message = error.response?.data?.message || error.message || fallbackMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  showErrorToast(message);
  return message;
};
