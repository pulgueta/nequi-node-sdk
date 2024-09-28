import { NequiError } from "@/error";
import { GenerateQR } from "@/qr";
import { PushPayment } from "@/payments";
import { Subscription } from "@/subscriptions";
import { Dispersions } from "@/dispersions";
import { Reports } from "@/reports";
import type { NequiOptions } from "@/types";

export class Nequi {
  readonly qr: GenerateQR;
  readonly pushPayment: PushPayment;
  readonly subscription: Subscription;
  readonly dispersions: Dispersions;
  readonly reports: Reports;

  constructor(opts: NequiOptions) {
    if (!opts.apiKey || !opts.clientId || !opts.clientSecret) {
      throw NequiError.from({
        message: "[Nequi SDK]: Proporcione las credenciales",
        name: "missing_required_field",
        status: 422,
      });
    }

    this.qr = new GenerateQR();
    this.pushPayment = new PushPayment();
    this.subscription = new Subscription();
    this.dispersions = new Dispersions();
    this.reports = new Reports();
  }
}
