import { AwilixContainer } from "awilix";
import { Express, Router } from "express";
import { levelRoutes } from "./level-routes";
import { authRoutes } from "./auth-routes";

export const setupRoutes = (app: Express, container: AwilixContainer) => {
  const router = Router();

  levelRoutes(router, container);
  authRoutes(router, container);

  app.use("/", router);
};
