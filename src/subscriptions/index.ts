import { CHANNELS, ENDPOINTS, URLS } from "@/constants";
import type {
  AutomaticPaymentBody,
  AutomaticPaymentResponse,
  CreateSubscriptionBody,
  CreateSubscriptionResponse,
  GetStatusPaymentBody,
  GetStatusPaymentResponse,
  GetSubscriptionBody,
  GetSubscriptionResponse,
  ReverseTransactionBody,
  ReverseTransactionResponse,
} from "./types";
import { NequiRequest } from "@/request";

export type SubscriptionOptions = {
  clientId: string;
  clientSecret: string;
  apiKey: string;
};

/**
 * @name Suscripciones
 * @description Servicio para suscribirse y realizar el pago de la suscripcion siendo cliente Nequi.
 */
export class Subscription extends NequiRequest {
  async automaticPayment(automaticPaymentRQ: AutomaticPaymentBody) {
    const req = await this.post<AutomaticPaymentResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.AUTOMATIC_PAYMENT}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.SUBSCRIPTION,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "SubscriptionPaymentService",
                ServiceOperation: "automaticPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                automaticPaymentRQ,
              },
            },
          },
        }),
      },
    );

    return req;
  }

  async getStatusPayment(getStatusPaymentRS: GetStatusPaymentBody) {
    const req = await this.post<GetStatusPaymentResponse>(`${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.STATUS_PAYMENT}`, {
      body: JSON.stringify({
        RequestMessage: {
          RequestHeader: {
            Channel: CHANNELS.SUBSCRIPTION,
            RequestDate: new Date().toISOString(),
            MessageID: "1234567890",
            ClientID: this.clientId,
            Destination: {
              ServiceName: "PaymentsService",
              ServiceOperation: "getStatusPayment",
              ServiceRegion: "C001",
              ServiceVersion: "1.0.0",
            },
          },
          RequestBody: {
            any: {
              getStatusPaymentRS,
            },
          },
        },
      }),
    });

    return req;
  }

  async createSubscription(newSubscriptionRQ: CreateSubscriptionBody) {
    const req = await this.post<CreateSubscriptionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.CREATE_SUBSCRIPTION}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.SUBSCRIPTION,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "getStatusPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                newSubscriptionRQ,
              },
            },
          },
        }),
      },
    );

    return req;
  }

  async getSubscription(getSubscriptionRQ: GetSubscriptionBody) {
    const req = await this.post<GetSubscriptionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.GET_SUBSCRIPTION}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.SUBSCRIPTION,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "getStatusPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                getSubscriptionRQ,
              },
            },
          },
        }),
      },
    );

    return req;
  }

  async reverseTransaction(reversionRQ: ReverseTransactionBody) {
    const req = await this.post<ReverseTransactionResponse>(
      `${URLS.BASE_PATH}${ENDPOINTS.SUBSCRIPTION.REVERSE_TRANSACTION}`,
      {
        body: JSON.stringify({
          RequestMessage: {
            RequestHeader: {
              Channel: CHANNELS.SUBSCRIPTION,
              RequestDate: new Date().toISOString(),
              MessageID: "1234567890",
              ClientID: this.clientId,
              Destination: {
                ServiceName: "PaymentsService",
                ServiceOperation: "getStatusPayment",
                ServiceRegion: "C001",
                ServiceVersion: "1.0.0",
              },
            },
            RequestBody: {
              any: {
                reversionRQ,
              },
            },
          },
        }),
      },
    );

    return req;
  }
}
