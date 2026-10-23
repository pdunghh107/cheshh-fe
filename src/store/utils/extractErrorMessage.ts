import axios from "axios";

import { SYSTEM_MESSAGES } from "@/commons/messages";
import type { ApiError } from "@/types/api";

const getServerErrorMessage = (err: unknown): string | null => {
  if (axios.isAxiosError<ApiError>(err)) {
    return err.response?.data?.message || err.message || null;
  }
  return null;
};

const getClientErrorMessage = (err: unknown): string | null => {
  if (err instanceof Error) {
    return err.message;
  }
  return null;
};

export const extractErrorMessage = (
  err: unknown,
  fallback: string = SYSTEM_MESSAGES.OPERATION_FAILED,
): string => {
  return getServerErrorMessage(err) || getClientErrorMessage(err) || fallback;
};
