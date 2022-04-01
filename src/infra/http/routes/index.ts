import { AwilixContainer } from "awilix";
import { Express, Router } from "express";
import { levelRoutes } from "./level-routes";

export const setupRoutes = (app: Express, container: AwilixContainer) => {
  const router = Router();

  app.use("/levels", router);

  levelRoutes(router, container);
};
