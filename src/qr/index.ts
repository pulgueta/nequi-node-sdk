import { ENDPOINTS, URLS } from "@/constants";
import type { Nequi } from "@/nequi";
import type { CreateQRBody, CreateQRResponse } from "./types";

export class GenerateQR {
  constructor(
    private readonly nequi: Nequi,
    private readonly apiKey: string,
  ) {}

  async create(body: CreateQRBody) {
    const res = await this.nequi.post<CreateQRResponse>(`${URLS.BASE_PATH}${ENDPOINTS.QR}`, {
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (res instanceof Error) {
      throw new Error(res.message);
    }

    return res;
  }
}
