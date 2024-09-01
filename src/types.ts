import type { ErrorResponse } from "@/error/interfaces";

export type FetchResponse<T> = {
  data: T | null;
  error: ErrorResponse | null;
};

export type NequiOptions = {
  apiKey: string;
  clientId: string;
  clientSecret: string;
};
