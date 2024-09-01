export type CreateQRBody = {
  code: string;
  value: string;
  [key: string]: unknown;
};

export type CreateQRResponse = {
  qr: string;
  qr_base64: string;
};
