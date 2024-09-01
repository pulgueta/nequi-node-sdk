import { url, cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  NEQUI_CLIENT_ID: str(),
  NEQUI_CLIENT_SECRET: str(),
  NEQUI_API_KEY: str(),
  NEQUI_AUTH_URI: url(),
  NEQUI_AUTH_GRANT_TYPE: str(),
  NEQUI_API_BASE_PATH: url(),
});
