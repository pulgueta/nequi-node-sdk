import type { Auth } from "@/auth/types";
import { nequiAuth } from "@/auth";
import { GenerateQR } from "@/qr";
import type { ErrorResponse } from "@/error/interfaces";
import type { NequiOptions, FetchResponse } from "@/types";

export class Nequi {
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  readonly qr: GenerateQR;

  constructor(opts: NequiOptions) {
    if (!opts.apiKey || !opts.clientId || !opts.clientSecret) {
      throw new Error(
        `[Nequi SDK]: Proporcione las credenciales ${
          !opts.apiKey ? "apiKey" : !opts.clientId ? "clientId" : "clientSecret"
        }`
      );
    }

    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;

    this.qr = new GenerateQR(this);
  }

  public getClientId(): string {
    return this.clientId;
  }

  private async auth(): Promise<Auth | Error> {
    const authenticate = await nequiAuth(this.clientId, this.clientSecret);

    if (authenticate instanceof Error) {
      throw new Error(authenticate.message);
    }

    return authenticate;
  }

  async request<const T>(
    url: string,
    options: RequestInit
  ): Promise<FetchResponse<T>> {
    const auth = await this.auth();

    if (auth instanceof Error) {
      throw new Error(auth.message);
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
        if (error instanceof SyntaxError) {
          return {
            data: null,
            error: {
              name: "application_error",
              message: "Internal server error",
            },
          };
        }

        const err: ErrorResponse = {
          name: "application_error",
          message: req.statusText,
        };

        if (error instanceof Error) {
          return { data: null, error: { ...err, message: error.message } };
        }

        return { data: null, error: err };
      }
    }

    return {
      data: (await req.json()) as T,
      error: null,
    };
  }

  async get<T>(
    url: string,
    options: { query: Record<string, unknown> }
  ): Promise<T | null> {
    const requestOptions = {
      method: "GET",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }

  async post<T>(url: string, options: RequestInit): Promise<T | null> {
    const requestOptions = {
      method: "POST",
      ...options,
    };

    const res = await this.request<T>(url, requestOptions);

    return res.data;
  }
}
