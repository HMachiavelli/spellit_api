import { AwilixContainer } from "awilix";
import { Router } from "express";

export const levelRoutes = (router: Router, container: AwilixContainer) => {
  router.post("/", (req, res) => {
    container.resolve("addLevelController").handle(req, res);
  });

  router.get("/", (req, res) => {
    container.resolve("getLevelsController").handle(req, res);
  });

  router.get("/:id", (req, res) => {
    container.resolve("getLevelController").handle(req, res);
  });

  router.delete("/:id", (req, res) => {
    container.resolve("removeLevelController").handle(req, res);
  });

  router.patch("/", (req, res) => {
    container.resolve("updateLevelController").handle(req, res);
  });
};
