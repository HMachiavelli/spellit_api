import { AwilixContainer } from "awilix";
import { Router } from "express";

export const levelRoutes = (router: Router, container: AwilixContainer) => {
  router.post("/levels", (req, res) => {
    container.resolve("addLevelController").handle(req, res);
  });

  router.get("/levels", (req, res) => {
    container.resolve("getLevelsController").handle(req, res);
  });

  router.get("/levels/:id", (req, res) => {
    container.resolve("getLevelController").handle(req, res);
  });

  router.delete("/levels/:id", (req, res) => {
    container.resolve("removeLevelController").handle(req, res);
  });

  router.patch("/levels", (req, res) => {
    container.resolve("updateLevelController").handle(req, res);
  });
};
