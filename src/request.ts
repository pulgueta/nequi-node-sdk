import { nequiAuth } from "@/auth";
import type { Auth } from "@/auth/types";
import { NequiError } from "@/error";
import type { FetchResponse } from "@/types";

export type NequiRequestOptions = {
  clientId: string;
  clientSecret: string;
  apiKey: string;
};

export class NequiRequest {
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly apiKey: string;

  constructor() {
    this.clientId = "";
    this.clientSecret = "";
    this.apiKey = "";
  }

  private async auth(): Promise<Auth | NequiError> {
    const authenticate = await nequiAuth(this.clientId, this.clientSecret);

    if (NequiError.isNequiError(authenticate)) {
      throw NequiError.from(authenticate);
    }

    return authenticate;
  }

  private async request<const T>(url: string, options: RequestInit): Promise<FetchResponse<T>> {
    const auth = await this.auth();

    if (auth instanceof NequiError) {
      throw NequiError.from(auth);
    }

    const req = await fetch(url, {
      ...options,
      headers: {
        Authorization: `${auth.tokenType} ${auth.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
    });

    if (!req.ok) {
      try {
        const err = await req.text();

        return { data: null, error: JSON.parse(err) };
      } catch (error) {
        if (NequiError.isNequiError(error)) {
          return {
            data: null,
            error: {
              name: "application_error",
              message: "Internal server error",
              status: 500,
            },
          };
        }

        const err: NequiError = {
          name: "application_error",
          message: req.statusText,
          status: 500,
        };

        if (NequiError.isNequiError(error)) {
          return {
            data: null,
            error: { ...err, message: error.message, status: error.status },
          };
        }

        return { data: null, error: err };
      }
    }

    return {
      data: (await req.json()) as T,
      error: null,
    };
  }

  protected async get<T>(url: string, options: { query: Record<string, unknown> }): Promise<T | null> {
    const requestOptions = {
      method: "GET",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }

  protected async post<T>(url: string, options: RequestInit): Promise<T | null> {
    const requestOptions = {
      method: "POST",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }
}
