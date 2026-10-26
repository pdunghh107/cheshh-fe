import {
  type AsyncThunk,
  type AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { AxiosRequestConfig } from "axios";

import {
  executeRequest,
  type HttpMethod,
  resolveEndpoint,
} from "./utils/executeRequest";
import {
  type ApiThunkConfigBase,
  handleError,
  handleSuccess,
  handleTransformData,
} from "./utils/handleApiFromState";

export interface ApiThunkConfig<TResponse, TPayload> extends ApiThunkConfigBase<
  TResponse,
  TPayload
> {
  method: HttpMethod;
  url: string | ((payload: TPayload) => string);
  axiosConfig?: AxiosRequestConfig;
}

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
      const endpoint = resolveEndpoint(config.url, payload);
      const responseData = await executeRequest<TResponse, TPayload>(
        config.method,
        { endpoint, payload, axiosConfig: config.axiosConfig },
      );

      await handleSuccess(config, responseData, payload, thunkAPI);
      return handleTransformData(config, responseData);
    } catch (err: unknown) {
      return handleError(config, err, payload, thunkAPI);
    }
  };

  return createAsyncThunk<TResponse, TPayload, { rejectValue: string }>(
    typePrefix,
    payloadCreator,
  );
}

export { executeRequest, resolveEndpoint };
