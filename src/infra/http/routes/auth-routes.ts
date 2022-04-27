import { AwilixContainer } from "awilix";
import { Router } from "express";

export const authRoutes = (router: Router, container: AwilixContainer) => {
  router.post("/authenticate", (req, res, next) => {
    container.resolve("authenticateController").handle(req, res, next);
  });
};
