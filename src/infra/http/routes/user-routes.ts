import { AwilixContainer } from "awilix";
import { Router } from "express";
import passport from "passport";
import onlyAdminMiddleware from "../middlewares/admin-only";

export const userRoutes = (router: Router, container: AwilixContainer) => {
  router.post(
    "/users",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("addUserController").handle(req, res, next);
    }
  );

  router.get(
    "/users",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("getUsersController").handle(req, res, next);
    }
  );

  router.get(
    "/users/:id",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("getUserController").handle(req, res, next);
    }
  );

  router.delete(
    "/users/:id",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("removeUserController").handle(req, res, next);
    }
  );

  router.patch(
    "/users",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("updateUserController").handle(req, res, next);
    }
  );
};
