/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Env {
  // App
  NEXT_PUBLIC_APP_URL?: string;

  // Api
  NEXT_PUBLIC_API_URL?: string;
  NEXT_PUBLIC_RPC_URL?: string;
  NEXT_PUBLIC_X_API_KEY?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
