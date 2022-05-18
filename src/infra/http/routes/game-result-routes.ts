import { AwilixContainer } from "awilix";
import { Router } from "express";
import passport from "passport";
import onlyAdminMiddleware from "../middlewares/admin-only";

export const gameResultRoutes = (
  router: Router,
  container: AwilixContainer
) => {
  router.post(
    "/game-result",
    passport.authenticate("bearer"),
    (req, res, next) => {
      container.resolve("addGameResultController").handle(req, res, next);
    }
  );
};
