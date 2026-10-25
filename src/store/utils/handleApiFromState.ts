import type { GetThunkAPI } from "@reduxjs/toolkit";

import { extractErrorMessage } from "./extractErrorMessage";

export interface ApiThunkConfigBase<TResponse, TPayload> {
  defaultErrorMessage?: string;
  onSuccess?: (
    data: TResponse,
    payload: TPayload,
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
  ) => void | Promise<void>;
  onError?: (
    error: unknown,
    payload: TPayload,
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
  ) => void | Promise<void>;
  transformResponse?: (rawResponse: TResponse) => unknown;
}

export const handleSuccess = async <TResponse, TPayload>(
  config: ApiThunkConfigBase<TResponse, TPayload>,
  data: TResponse,
  payload: TPayload,
  thunkAPI: GetThunkAPI<{ rejectValue: string }>,
): Promise<void> => {
  if (config.onSuccess) {
    console.log("[THANH CONG]");
    await config.onSuccess(data, payload, thunkAPI);
  }
};

export const handleTransformData = <TResponse, TPayload>(
  config: ApiThunkConfigBase<TResponse, TPayload>,
  data: TResponse,
): TResponse => {
  console.log("[CHUAN HOA DU LIEU]");
  return config.transformResponse
    ? (config.transformResponse(data) as TResponse)
    : data;
};

export const handleError = async <TResponse, TPayload>(
  config: ApiThunkConfigBase<TResponse, TPayload>,
  err: unknown,
  payload: TPayload,
  thunkAPI: GetThunkAPI<{ rejectValue: string }>,
) => {
  if (config.onError) {
    console.log("[THAT BAI]", err);
    await config.onError(err, payload, thunkAPI);
  }

  const errorMessage = extractErrorMessage(err, config.defaultErrorMessage);
  return thunkAPI.rejectWithValue(errorMessage);
};
