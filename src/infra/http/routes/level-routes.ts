import { AwilixContainer } from "awilix";
import { Router } from "express";
import passport from "passport";
import onlyAdminMiddleware from "../middlewares/admin-only";

export const levelRoutes = (router: Router, container: AwilixContainer) => {
  router.post(
    "/levels",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("addLevelController").handle(req, res, next);
    }
  );

  router.get(
    "/levels",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("getLevelsController").handle(req, res, next);
    }
  );

  router.get(
    "/levels/:id",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("getLevelController").handle(req, res, next);
    }
  );

  router.delete(
    "/levels/:id",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("removeLevelController").handle(req, res, next);
    }
  );

  router.patch(
    "/levels",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("updateLevelController").handle(req, res, next);
    }
  );
};
