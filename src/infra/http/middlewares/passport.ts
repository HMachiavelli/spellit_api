"use strict";

import passport from "passport";
import { Strategy } from "passport-http-bearer";
import authMiddleware from "./auth";

declare global {
  namespace Express {
    interface User {
      role: string;
    }
  }
}

export default () => {
  passport.serializeUser(function (user: Express.User, done: any) {
    done(null, user);
  });

  passport.deserializeUser(function (user: Express.User, done: any) {
    done(null, user);
  });

  passport.use(new Strategy(authMiddleware));
};
