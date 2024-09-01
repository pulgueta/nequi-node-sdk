import type { Auth } from "@/auth";
import { nequiAuth } from "@/auth";
import { GenerateQR } from "@/qr";

export type NequiOptions = {
  apiKey: string;
  clientId: string;
  clientSecret: string;
};

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
        }`,
      );
    }

    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;

    this.qr = new GenerateQR(this, this.apiKey);
  }

  private async auth(): Promise<Auth | Error> {
    const authenticate = await nequiAuth(this.clientId, this.clientSecret);

    if (authenticate instanceof Error) {
      throw new Error(authenticate.message);
    }

    return authenticate;
  }

  async request<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    const auth = await this.auth();

    if (auth instanceof Error) {
      throw new Error(auth.message);
    }

    const req = await fetch(url, {
      ...options,
      headers: {
        Authorization: `${auth.tokenType} ${auth.token}`,
      },
    });

    if (!req.ok) {
      return null;
    }

    return req.json() as Promise<T>;
  }

  async get<T>(url: string, options: { query: Record<string, unknown> }): Promise<T | null> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    return this.request<T>(url, requestOptions);
  }

  async post<T>(url: string, body: Record<string, any>): Promise<T | null> {
    return this.request<T>(url, { method: "POST", body: JSON.stringify(body) });
  }
}
