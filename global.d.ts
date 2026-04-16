declare module "*.css";

declare namespace NodeJS {
  interface ProcessEnv {
    ASSISTANT_API_BASE_URL?: string;
    ASSISTANT_API_KEY?: string;
  }
}
