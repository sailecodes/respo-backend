export {};

declare module "express-session" {
  interface SessionData {
    uid: string;
    role: string;
  }
}
