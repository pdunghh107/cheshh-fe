import type { AxiosRequestConfig } from "axios";

import { apiClient } from "@/services/api";

export interface RequestContext<TPayload> {
  endpoint: string;
  payload: TPayload;
  axiosConfig?: AxiosRequestConfig;
}

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export const resolveEndpoint = <TPayload>(
  url: string | ((payload: TPayload) => string),
  payload: TPayload,
): string => {
  return typeof url === "function" ? url(payload) : url;
};

export const requestWithParams = async <TResponse, TPayload>(
  method: "get" | "delete",
  context: RequestContext<TPayload>,
): Promise<TResponse> => {
  const res = await apiClient[method]<TResponse>(context.endpoint, {
    ...context.axiosConfig,
    params: context.payload,
  });

  return res.data;
};

export const requestWithBody = async <TResponse, TPayload>(
  method: "post" | "put" | "patch",
  context: RequestContext<TPayload>,
): Promise<TResponse> => {
  const res = await apiClient[method]<TResponse>(
    context.endpoint,
    context.payload,
    context.axiosConfig,
  );

  return res.data;
};

export const executeRequest = async <TResponse, TPayload>(
  method: HttpMethod,
  context: RequestContext<TPayload>,
): Promise<TResponse> => {
  if (method === "get" || method === "delete") {
    return await requestWithParams(method, context);
  }
  return await requestWithBody(method, context);
};
