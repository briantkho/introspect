export type UserSession = {
  uid: string;
  user_name: string;
  email: string;
};

declare module "express-session" {
  interface SessionData {
    user?: UserSession;
  }
}
