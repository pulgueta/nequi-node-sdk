import "dotenv/config";

type Options = {
  apiKey: string;
  clientId: string;
  clientSecret: string;
};

export class Nequi {
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(opts: Options) {
    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;
  }

  async log() {
    console.log({
      apiKey: this.apiKey,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }
}
