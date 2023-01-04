import type { Request } from "express";
import type { UserType } from "./user";

/**
 * Type of a user session
 */
export type UserSession = {
  user_id: string;
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
export const createSession = (user: UserType, req: Request): void => {
  const userSession: UserSession = {
    user_id: user.user_id,
    email: user.email,
    user_name: user.user_name,
  };

  req.session.user = userSession;
};

export const getSession = (req: Request): UserSession => {
  if (req.session.user) {
    return req.session.user;
  } else {
    throw new Error("No user found");
  }
};
