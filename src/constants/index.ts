export const ENDPOINTS = {
  PAYMENT: "/payments/v2/-services-paymentservice-generatecodeqr",
  PAYMENT_PUSH: "/payments/v2/-services-paymentservice-unregisteredpayment",
  DEPOSIT_WITHDRAWAL_CHARGE_ACOUNT: "/agents/v2/-services-cashinservice-cashin",
  DEPOSIT_WITHDRAWAL_VALIDATE_CLIENT: "/agents/v2/-services-clientservice-validateclient",
} as const;
