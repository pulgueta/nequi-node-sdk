import { URLS } from "@/constants";

export type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type Auth = {
  token: string;
  tokenType: string;
  expiresAt: Date;
  isValid: boolean;
};

export const nequiAuth = async (clientId: string, clientSecret: string): Promise<Auth | Error> => {
  try {
    const authToken = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;

    const req = await fetch(`${URLS.AUTH_URI}?grant_type=client_credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authToken,
        Accept: "application/json",
      },
    });

    if (!req.ok) {
      throw new Error("[Nequi SDK]: Fallo de autenticación");
    }

    const res = (await req.json()) as AuthResponse;

    return {
      token: res.access_token,
      tokenType: res.token_type,
      expiresAt: new Date(Date.now() + res.expires_in * 1000),
      isValid: new Date() < new Date(Date.now() + res.expires_in * 1000),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("[Nequi SDK]: Fallo de autenticación:", error);
    }

    throw new Error("[Nequi SDK]: Fallo de autenticación");
  }
};
