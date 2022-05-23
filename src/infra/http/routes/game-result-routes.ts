import { AwilixContainer } from "awilix";
import { Router } from "express";
import passport from "passport";

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

  router.get(
    "/game-result/:id",
    passport.authenticate("bearer"),
    (req, res, next) => {
      container.resolve("getGameResultController").handle(req, res, next);
    }
  );
};
