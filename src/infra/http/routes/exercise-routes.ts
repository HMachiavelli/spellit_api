import { AwilixContainer } from "awilix";
import { Router } from "express";
import passport from "passport";
import onlyAdminMiddleware from "../middlewares/admin-only";

export const exerciseRoutes = (router: Router, container: AwilixContainer) => {
  router.post(
    "/exercises",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("addExerciseController").handle(req, res, next);
    }
  );

  router.post(
    "/exercises/:id/answer",
    passport.authenticate("bearer"),
    (req, res, next) => {
      container.resolve("answerExerciseController").handle(req, res, next);
    }
  );

  router.get(
    "/exercises",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("getExercisesController").handle(req, res, next);
    }
  );

  router.get(
    "/exercises/:id",
    passport.authenticate("bearer"),
    (req, res, next) => {
      container.resolve("getExerciseController").handle(req, res, next);
    }
  );

  router.delete(
    "/exercises/:id",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("removeExerciseController").handle(req, res, next);
    }
  );

  router.patch(
    "/exercises",
    passport.authenticate("bearer"),
    onlyAdminMiddleware,
    (req, res, next) => {
      container.resolve("updateExerciseController").handle(req, res, next);
    }
  );
};
