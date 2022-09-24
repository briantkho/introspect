import type { Request } from "express";
import type { User } from "./user";

/**
 * Type of a user session
 */
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

/**
 * Creates a user session
 * @param user the user to create a session
 * @param req request to add a session
 */
export const createSession = (user: User, req: Request): void => {
  const userSession: UserSession = {
    uid: user.uid,
    email: user.email,
    user_name: user.user_name,
  };

  req.session.user = userSession;
};
