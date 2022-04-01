import { AwilixContainer } from "awilix";
import { Router } from "express";

export const levelRoutes = (router: Router, container: AwilixContainer) => {
  router.post("/", (req, res) => {
    container.resolve("addLevelController").handle(req, res);
  });

  router.get("/:id", (req, res) => {
    container.resolve("getLevelController").handle(req, res);
  });
};
