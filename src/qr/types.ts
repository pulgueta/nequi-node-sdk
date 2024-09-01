export type CreateQRBody = {
  amount: number;
  currency: string;
  description: string;
};

export type CreateQRResponse = {
  qr: string;
  qr_base64: string;
};
