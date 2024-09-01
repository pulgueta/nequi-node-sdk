import { Nequi } from "@/nequi";
import type { CreateQRBody, CreateQRResponse } from "./types";
import { ENDPOINTS, URLS, CHANNELS } from "@/constants";

export class GenerateQR {
  constructor(private readonly nequi: Nequi) {}

  async createQR(body: CreateQRBody) {
    const clientId = this.nequi.getClientId();

    const req = await this.nequi.post<CreateQRResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.QR}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.QR,
              RequestDate: new Date().toISOString(),
              MessageID: this.nequi,
              ClientID: clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "generateCodeQR",
                ServiceRegion: "C001",
                ServiceVersion: "1.2.0",
              },
            },
            RequestBody: {
              any: {
                generateCodeQRRQ: body,
              },
            },
          },
        }),
      }
    );

    return req;
  }
}
